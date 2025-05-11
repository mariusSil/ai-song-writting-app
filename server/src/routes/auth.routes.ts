import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

/**
 * @route POST /api/auth/login
 * @desc Initiate login with email (sends OTP) or verify OTP
 * @access Public
 */
router.post('/login', authController.login.bind(authController));

/**
 * @route GET /api/auth/profile
 * @desc Get current user profile
 * @access Private
 */
router.get('/profile', authenticate, authController.getProfile.bind(authController));

/**
 * @route POST /api/auth/reset-password-request
 * @desc Request password reset email with OTP
 * @access Public
 */
router.post('/reset-password-request', authController.requestPasswordReset.bind(authController));

/**
 * @route POST /api/auth/reset-password
 * @desc Reset password with OTP verification
 * @access Public
 */
router.post('/reset-password', authController.resetPassword.bind(authController));

/**
 * @route DELETE /api/auth/delete-account
 * @desc Delete user account
 * @access Private
 */
router.delete('/delete-account', authenticate, authController.deleteAccount.bind(authController));

export default router;
