import { createClient, SupabaseClient } from '@supabase/supabase-js';
import jwt, { SignOptions } from 'jsonwebtoken';
import { 
  User, 
  OtpVerificationData, 
  UserProfile,
  UserRole,
  SubscriptionTier,
  AuthResponse
} from '../../models/user.model';
import env from '../../config/env';
import { logger } from '../../utils/logger';

/**
 * Service for handling user operations with Supabase
 * Implements passwordless authentication using email OTP
 */
export class SupabaseUserService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  }

  /**
   * Request OTP for authentication
   * @param email User's email
   * @returns Success status
   */
  async requestOtp(email: string): Promise<boolean> {
    try {
      // Send the OTP to the user's email using Supabase Auth's built-in functionality
      const { error: authError } = await this.supabase.auth.signInWithOtp({
        email: email
      });

      if (authError) {
        logger.error('Failed to send OTP', { error: authError });
        throw new Error('Failed to send verification code to email');
      }

      return true;
    } catch (error) {
      logger.error('OTP request error', { error });
      throw error;
    }
  }

  /**
   * Verify OTP and authenticate the user
   * @param verifyData OTP verification data
   * @returns AuthResponse with user and token
   */
  async verifyOtp(verifyData: OtpVerificationData): Promise<AuthResponse> {
    try {
      // Verify the OTP
      const { data, error } = await this.supabase.auth.verifyOtp({
        email: verifyData.email,
        token: verifyData.otp,
        type: 'email'
      });

      if (error) {
        logger.error('OTP verification error', { error });
        throw new Error('Invalid verification code');
      }

      if (!data?.user) {
        throw new Error('User not found');
      }

      // Check if the user exists in our users table
      const { data: existingUser } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      // If user doesn't exist in our database, create the user record
      let isNewUser = false;
      if (!existingUser) {
        isNewUser = true;
        const userMetadata = data.user.user_metadata || {};
        
        // Create user in users table
        const { data: newUser, error: userError } = await this.supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            role: (userMetadata.role as UserRole) || UserRole.USER,
            created_at: new Date(),
            updated_at: new Date()
          })
          .select()
          .single();

        if (userError || !newUser) {
          logger.error('Failed to create user', { error: userError });
          throw new Error('Failed to create user');
        }

        // Create user profile
        const { error: profileError } = await this.supabase
          .from('user_profiles')
          .insert({
            user_id: newUser.id,
            username: userMetadata.username || data.user.email?.split('@')[0],
            display_name: userMetadata.display_name || userMetadata.username || data.user.email?.split('@')[0],
            created_at: new Date(),
            updated_at: new Date()
          });

        if (profileError) {
          logger.error('Failed to create user profile', { error: profileError });
          throw new Error('Failed to create user profile');
        }

        // Create default subscription (free tier)
        await this.supabase
          .from('user_subscriptions')
          .insert({
            user_id: newUser.id,
            tier: SubscriptionTier.FREE,
            status: 'active',
            cancel_at_period_end: false,
            created_at: new Date(),
            updated_at: new Date()
          });

        // Initialize usage tracking
        await this.supabase
          .from('user_usage')
          .insert({
            user_id: newUser.id,
            songs_created: 0,
            ai_generations: 0,
            storage_used: 0,
            last_reset_date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
          });
      }

      // Get user data with relations
      const userData = await this.getUserWithRelations(data.user.id);

      // Generate JWT token
      const token = this.generateToken(userData);

      // Return user with token
      return {
        user: userData,
        token,
        isNewUser
      };
    } catch (error) {
      logger.error('OTP verification error', { error });
      throw error;
    }
  }

  /**
   * Get a user by ID with related data
   * @param userId User ID
   * @returns Complete user object with profile, subscription, and usage
   */
  async getUserWithRelations(userId: string): Promise<User> {
    try {
      // Get user
      const { data: user, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !user) {
        throw new Error('User not found');
      }

      // Get user profile
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      // Get user subscription
      const { data: subscription } = await this.supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      // Get user usage
      const { data: usage } = await this.supabase
        .from('user_usage')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      // Combine all user data
      return {
        ...user,
        profile: profile as UserProfile || null,
        subscription: subscription || null,
        usage: usage || null
      } as User;
    } catch (error) {
      logger.error('Error fetching user with relations', { error, userId });
      throw error;
    }
  }

  /**
   * Generate a JWT token for a user
   * @param user User object
   * @returns JWT token
   */
  private generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    
    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN || '7d'
    };
    
    return jwt.sign(payload, env.JWT_SECRET, options);
  }

  /**
   * Delete a user and all associated data
   * @param userId User ID to delete
   * @returns Success status
   */
  async deleteUser(userId: string): Promise<boolean> {
    try {
      // Delete user relations first (foreign key constraints)
      await this.supabase.from('user_usage').delete().eq('user_id', userId);
      await this.supabase.from('user_subscriptions').delete().eq('user_id', userId);
      await this.supabase.from('user_profiles').delete().eq('user_id', userId);

      // Delete auth user
      const { error } = await this.supabase.auth.admin.deleteUser(userId);
      
      if (error) {
        logger.error('Failed to delete user from auth', { error, userId });
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      
      // Delete user from users table
      await this.supabase.from('users').delete().eq('id', userId);
      
      return true;
    } catch (error) {
      logger.error('Error deleting user', { error, userId });
      throw error;
    }
  }
}
