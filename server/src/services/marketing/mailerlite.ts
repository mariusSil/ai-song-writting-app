import axios from 'axios';
import { logger } from '../../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MailerLite API service for marketing automation
 * Documentation: https://developers.mailerlite.com/docs/
 */
export class MailerLiteService {
  private apiKey: string;
  private baseUrl: string = 'https://connect.mailerlite.com/api';
  
  constructor() {
    this.apiKey = process.env.MAILERLITE_API_KEY || '';
    if (!this.apiKey) {
      logger.warn('MailerLite API key is not set. Marketing features will be disabled.');
    }
  }

  /**
   * Get the default headers for MailerLite API requests
   */
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  /**
   * Subscribe a user to a MailerLite group
   * @param email User's email address
   * @param name User's name
   * @param groupId MailerLite group ID
   * @param fields Additional fields for the subscriber
   */
  async subscribeToGroup(email: string, name: string, groupId: string, fields: Record<string, any> = {}) {
    if (!this.apiKey) {
      logger.error('Cannot subscribe to MailerLite: API key not set');
      return null;
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/subscribers`,
        {
          email,
          fields: {
            name,
            ...fields
          },
          groups: [groupId]
        },
        { headers: this.getHeaders() }
      );
      
      logger.info(`Successfully subscribed ${email} to MailerLite group ${groupId}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to subscribe ${email} to MailerLite group: ${error}`);
      throw error;
    }
  }

  /**
   * Create or update a subscriber in MailerLite
   * @param email User's email address
   * @param fields Fields to update
   */
  async updateSubscriber(email: string, fields: Record<string, any> = {}) {
    if (!this.apiKey) {
      logger.error('Cannot update MailerLite subscriber: API key not set');
      return null;
    }

    try {
      const response = await axios.put(
        `${this.baseUrl}/subscribers/${email}`,
        { fields },
        { headers: this.getHeaders() }
      );
      
      logger.info(`Successfully updated MailerLite subscriber ${email}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to update MailerLite subscriber ${email}: ${error}`);
      throw error;
    }
  }

  /**
   * Get a subscriber by email
   * @param email User's email address
   */
  async getSubscriber(email: string) {
    if (!this.apiKey) {
      logger.error('Cannot get MailerLite subscriber: API key not set');
      return null;
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/subscribers/${email}`,
        { headers: this.getHeaders() }
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        logger.info(`Subscriber ${email} not found in MailerLite`);
        return null;
      }
      
      logger.error(`Failed to get MailerLite subscriber ${email}: ${error}`);
      throw error;
    }
  }

  /**
   * Send a transactional email using MailerLite
   * @param templateId MailerLite email template ID
   * @param recipient Recipient email address
   * @param variables Variables to use in the template
   */
  async sendTransactionalEmail(templateId: string, recipient: string, variables: Record<string, any> = {}) {
    if (!this.apiKey) {
      logger.error('Cannot send transactional email: MailerLite API key not set');
      return null;
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/campaigns/transactional`,
        {
          template_id: templateId,
          email: recipient,
          variables
        },
        { headers: this.getHeaders() }
      );
      
      logger.info(`Successfully sent transactional email to ${recipient}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to send transactional email to ${recipient}: ${error}`);
      throw error;
    }
  }
}

// Export a singleton instance
export const mailerLite = new MailerLiteService();
