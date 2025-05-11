import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const profileController = new ProfileController();

/**
 * @route GET /api/profile
 * @desc Get user profile
 * @access Private
 */
router.get('/', authenticate, profileController.getProfile.bind(profileController));

/**
 * @route PUT /api/profile
 * @desc Update user profile
 * @access Private
 */
router.put('/', authenticate, profileController.updateProfile.bind(profileController));

/**
 * @route POST /api/profile/picture
 * @desc Upload profile picture
 * @access Private
 */
router.post('/picture', authenticate, profileController.uploadProfilePicture.bind(profileController));

/**
 * @route PUT /api/profile/preferences
 * @desc Update user preferences
 * @access Private
 */
router.put('/preferences', authenticate, profileController.updatePreferences.bind(profileController));

export default router;
