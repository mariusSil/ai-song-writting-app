import { Request, Response } from 'express';
import { mailerLite } from '../services/marketing/mailerlite';
import { logger } from '../utils/logger';

/**
 * Marketing controller for handling marketing-related functionality
 */
export class MarketingController {
  /**
   * Subscribe a user to the newsletter
   */
  async subscribeToNewsletter(req: Request, res: Response) {
    try {
      const { email, name, consent } = req.body;
      
      if (!email || !name) {
        return res.status(400).json({ message: 'Email and name are required' });
      }
      
      if (!consent) {
        return res.status(400).json({ message: 'Marketing consent is required' });
      }
      
      // The newsletter group ID should be configured in your MailerLite account
      const newsletterGroupId = process.env.MAILERLITE_NEWSLETTER_GROUP_ID;
      
      if (!newsletterGroupId) {
        logger.error('MAILERLITE_NEWSLETTER_GROUP_ID is not set in environment variables');
        return res.status(500).json({ message: 'Newsletter subscription is not configured properly' });
      }
      
      const result = await mailerLite.subscribeToGroup(email, name, newsletterGroupId, {
        consent_timestamp: new Date().toISOString(),
        subscription_source: 'website'
      });
      
      return res.status(200).json({ message: 'Successfully subscribed to newsletter', result });
    } catch (error) {
      logger.error(`Error subscribing to newsletter: ${error}`);
      return res.status(500).json({ message: 'Failed to subscribe to newsletter' });
    }
  }
  
  /**
   * Send a marketing email
   */
  async sendMarketingEmail(req: Request, res: Response) {
    try {
      const { templateId, email, variables } = req.body;
      
      if (!templateId || !email) {
        return res.status(400).json({ message: 'Template ID and email are required' });
      }
      
      const result = await mailerLite.sendTransactionalEmail(templateId, email, variables);
      
      return res.status(200).json({ message: 'Successfully sent marketing email', result });
    } catch (error) {
      logger.error(`Error sending marketing email: ${error}`);
      return res.status(500).json({ message: 'Failed to send marketing email' });
    }
  }
  
  /**
   * Update marketing preferences for a user
   */
  async updateMarketingPreferences(req: Request, res: Response) {
    try {
      const { email, preferences } = req.body;
      
      if (!email || !preferences) {
        return res.status(400).json({ message: 'Email and preferences are required' });
      }
      
      const result = await mailerLite.updateSubscriber(email, {
        marketing_preferences: JSON.stringify(preferences),
        preferences_updated_at: new Date().toISOString()
      });
      
      return res.status(200).json({ message: 'Successfully updated marketing preferences', result });
    } catch (error) {
      logger.error(`Error updating marketing preferences: ${error}`);
      return res.status(500).json({ message: 'Failed to update marketing preferences' });
    }
  }
}

export const marketingController = new MarketingController();
