/**
 * User model interfaces
 * Defines the data structures for users in the system
 */

/**
 * User roles in the system
 */
export enum UserRole {
  USER = 'user',
  ARTIST = 'artist',
  PRODUCER = 'producer',
  ADMIN = 'admin',
}

/**
 * User subscription tiers
 */
export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

/**
 * Base user interface with properties from auth system
 */
export interface BaseUser {
  id: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

/**
 * User profile information
 */
export interface UserProfile {
  user_id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  location?: string;
  social_links?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
    soundcloud?: string;
    [key: string]: string | undefined;
  };
  preferences?: {
    genres?: string[];
    themes?: string[];
    notification_settings?: Record<string, boolean>;
    collaboration_preferences?: Record<string, any>;
    [key: string]: any;
  };
  created_at: Date;
  updated_at: Date;
}

/**
 * Subscription information for users
 */
export interface UserSubscription {
  user_id: string;
  tier: SubscriptionTier;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  current_period_start?: Date;
  current_period_end?: Date;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  cancel_at_period_end: boolean;
  created_at: Date;
  updated_at: Date;
}

/**
 * Usage limits and quotas for users based on their subscription
 */
export interface UserUsage {
  user_id: string;
  songs_created: number;
  ai_generations: number;
  storage_used: number; // in bytes
  last_reset_date: Date;
  created_at: Date;
  updated_at: Date;
}

/**
 * Complete user with all related data
 */
export interface User extends BaseUser {
  profile?: UserProfile;
  subscription?: UserSubscription;
  usage?: UserUsage;
}

/**
 * Data for OTP verification and user creation
 */
export interface OtpVerificationData {
  email: string;
  otp: string;
  username?: string;
  display_name?: string;
  role?: UserRole;
}

/**
 * Data structure for login requests
 */
export interface UserLoginData {
  email: string;
  otp?: string; // Optional OTP code for verification step
}

/**
 * Response structure for authentication operations
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  isNewUser?: boolean;
}
