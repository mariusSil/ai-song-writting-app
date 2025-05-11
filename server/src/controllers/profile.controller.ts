import { Request, Response } from 'express';
import { z } from 'zod';
import { SupabaseUserService } from '../services/user/supabase.user.service';
import { logger } from '../utils/logger';

// Initialize user service
const userService = new SupabaseUserService();

// Validation schemas
const updateProfileSchema = z.object({
  display_name: z.string().optional(),
  bio: z.string().optional(),
  avatar_url: z.string().url().optional().nullish().transform(val => val || undefined),
  website: z.string().url().optional().nullish().transform(val => val || undefined),
  location: z.string().optional(),
  social_links: z.record(z.string()).optional(),
  preferences: z.record(z.any()).optional()
});

/**
 * User profile controller
 */
export class ProfileController {
  /**
   * Get user profile
   * @param req Express request
   * @param res Express response
   */
  async getProfile(req: Request, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      const user = await userService.getUserWithRelations(req.userId);
      
      res.status(200).json({
        message: 'Profile retrieved successfully',
        profile: user.profile || {}
      });
    } catch (error: any) {
      logger.error('Get profile error', { error });
      
      if (error.message === 'User not found') {
        return res.status(404).json({ message: 'User profile not found' });
      }
      
      res.status(500).json({ message: 'An error occurred while retrieving profile' });
    }
  }

  /**
   * Update user profile
   * @param req Express request
   * @param res Express response
   */
  async updateProfile(req: Request, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      // Validate input
      const validation = updateProfileSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: 'Invalid input data', 
          errors: validation.error.format() 
        });
      }

      const profileData = validation.data;
      
      // Update profile
      const updatedProfile = await userService.updateUserProfile(req.userId, profileData);
      
      res.status(200).json({
        message: 'Profile updated successfully',
        profile: updatedProfile
      });
    } catch (error: any) {
      logger.error('Update profile error', { error });
      
      if (error.message === 'User not found') {
        return res.status(404).json({ message: 'User profile not found' });
      }
      
      res.status(500).json({ message: 'An error occurred while updating profile' });
    }
  }

  /**
   * Upload profile picture
   * @param req Express request
   * @param res Express response
   */
  async uploadProfilePicture(req: Request, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      // This is a placeholder for file upload functionality
      // In a real implementation, you would use Supabase Storage or similar to handle file uploads
      // For now, we'll just update the avatar URL if it's provided in the request
      if (!req.body.avatar_url) {
        return res.status(400).json({ message: 'No avatar URL provided' });
      }
      
      const updatedProfile = await userService.updateUserProfile(req.userId, {
        avatar_url: req.body.avatar_url
      });
      
      res.status(200).json({
        message: 'Profile picture updated successfully',
        profile: updatedProfile
      });
    } catch (error: any) {
      logger.error('Upload profile picture error', { error });
      
      if (error.message === 'User not found') {
        return res.status(404).json({ message: 'User profile not found' });
      }
      
      res.status(500).json({ message: 'An error occurred while updating profile picture' });
    }
  }

  /**
   * Update user preferences
   * @param req Express request
   * @param res Express response
   */
  async updatePreferences(req: Request, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      if (!req.body.preferences || typeof req.body.preferences !== 'object') {
        return res.status(400).json({ message: 'Invalid preferences format' });
      }
      
      // Get current user profile to merge preferences
      const user = await userService.getUserWithRelations(req.userId);
      
      if (!user.profile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      
      // Merge existing preferences with new ones
      const currentPreferences = user.profile.preferences || {};
      const updatedPreferences = {
        ...currentPreferences,
        ...req.body.preferences
      };
      
      // Update profile with new preferences
      const updatedProfile = await userService.updateUserProfile(req.userId, {
        preferences: updatedPreferences
      });
      
      res.status(200).json({
        message: 'Preferences updated successfully',
        preferences: updatedProfile.preferences
      });
    } catch (error: any) {
      logger.error('Update preferences error', { error });
      
      if (error.message === 'User not found') {
        return res.status(404).json({ message: 'User profile not found' });
      }
      
      res.status(500).json({ message: 'An error occurred while updating preferences' });
    }
  }
}
