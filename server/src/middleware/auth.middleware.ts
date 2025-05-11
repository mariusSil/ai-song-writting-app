import { Request, Response, NextFunction } from 'express';
import { SupabaseUserService } from '../services/user/supabase.user.service';
import { UserRole } from '../models/user.model';
import { logger } from '../utils/logger';

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: string;
    }
  }
}

const userService = new SupabaseUserService();

/**
 * Authentication middleware to verify JWT tokens
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Verify token and get user ID
      const userId = userService.verifyToken(token);
      
      if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      // Get user info
      const user = await userService.getUserWithRelations(userId);
      
      // Attach user to request
      req.user = user;
      req.userId = userId;
      
      next();
    } catch (error) {
      logger.error('Authentication error', { error });
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    logger.error('Authentication middleware error', { error });
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Authorization middleware to check user roles
 * @param allowedRoles Array of allowed roles
 */
export const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      logger.error('Authorization middleware error', { error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

/**
 * Rate limiting middleware based on user ID
 * Currently a placeholder for future implementation
 * @param limit Number of requests allowed per timeWindow
 * @param timeWindow Time window in milliseconds
 */
export const rateLimit = (limit: number, timeWindow: number) => {
  // Simple in-memory rate limiter - for production use Redis or similar
  const requests: Record<string, { count: number, resetTime: number }> = {};
  
  return (req: Request, res: Response, next: NextFunction) => {
    // Get a unique identifier for the request (userId or IP)
    const requestId = (req.userId || req.ip || 'unknown').toString();
    const now = Date.now();
    
    // Initialize or reset if window expired
    if (!requests[requestId] || now > requests[requestId].resetTime) {
      requests[requestId] = {
        count: 1,
        resetTime: now + timeWindow
      };
      return next();
    }
    
    // Increment counter
    requests[requestId].count++;
    
    // Check if limit exceeded
    if (requests[requestId].count > limit) {
      return res.status(429).json({ 
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil((requests[requestId].resetTime - now) / 1000)
      });
    }
    
    next();
  };
};
