import { Request, Response } from 'express';
import { z } from 'zod';
import { SupabaseUserService } from '../services/user/supabase.user.service';
import { UserRole } from '../models/user.model';
import { logger } from '../utils/logger';

// Initialize user service
const userService = new SupabaseUserService();

// Input validation schemas
const requestOtpSchema = z.object({
  email: z.string().email('Invalid email format')
});

const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email format'),
  otp: z.string().length(6, 'Verification code must be 6 digits'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username must be at most 30 characters').optional(),
  display_name: z.string().optional(),
  role: z.enum([UserRole.USER, UserRole.ARTIST, UserRole.PRODUCER]).optional()
});

/**
 * Authentication controller
 */
export class AuthController {
  /**
   * Request OTP for authentication
   * @param req Express request
   * @param res Express response
   */
  async requestOtp(req: Request, res: Response) {
    try {
      // Validate input
      const validation = requestOtpSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: 'Invalid input data', 
          errors: validation.error.format() 
        });
      }

      const { email } = validation.data;
      
      // Request OTP
      const result = await userService.requestOtp(email);
      
      res.status(200).json({
        message: 'Verification code sent to your email',
        otpSent: true,
        email
      });
    } catch (error: any) {
      logger.error('OTP request error', { error });
      res.status(500).json({ message: 'An error occurred while sending verification code' });
    }
  }

  /**
   * Verify OTP and authenticate user
   * @param req Express request
   * @param res Express response
   */
  async verifyOtp(req: Request, res: Response) {
    try {
      // Validate input
      const validation = verifyOtpSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: 'Invalid input data', 
          errors: validation.error.format() 
        });
      }

      const verifyData = validation.data;
      
      // Verify OTP and authenticate
      const result = await userService.verifyOtp(verifyData);
      
      res.status(200).json({
        message: 'Authentication successful',
        user: result.user,
        token: result.token,
        isNewUser: result.isNewUser
      });
    } catch (error: any) {
      logger.error('OTP verification error', { error });
      
      if (error.message === 'Invalid verification code') {
        return res.status(401).json({ message: 'Invalid verification code' });
      }
      
      res.status(500).json({ message: 'An error occurred during authentication' });
    }
  }

  /**
   * Get current user profile
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
        user
      });
    } catch (error: any) {
      logger.error('Get profile error', { error });
      
      if (error.message === 'User not found') {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(500).json({ message: 'An error occurred while retrieving profile' });
    }
  }

  /**
   * Delete user account
   * @param req Express request
   * @param res Express response
   */
  async deleteAccount(req: Request, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      await userService.deleteUser(req.userId);
      
      res.status(200).json({
        message: 'Account deleted successfully'
      });
    } catch (error: any) {
      logger.error('Delete account error', { error });
      res.status(500).json({ message: 'An error occurred while deleting account' });
    }
  }
}
