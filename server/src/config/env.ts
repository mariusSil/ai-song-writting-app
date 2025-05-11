import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Define environment variables schema for validation
const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(val => parseInt(val, 10)).default('3000'),
  
  // Supabase
  SUPABASE_URL: z.string().refine(
    (val) => {
      // For empty strings or undefined, we'll check later with optional()
      if (!val) return false;
      
      // Allow localhost URLs for development with any format
      if (val.includes('localhost')) {
        return true;
      }
      
      // Otherwise, validate as a standard URL
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Must be a valid URL or localhost URL" }
  ),
  SUPABASE_SERVICE_KEY: z.string().min(1),
  
  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  
  // AI Services
  DEEPINFRA_API_KEY: z.string().min(1),
  PERPLEXITY_API_KEY: z.string().min(1),
  SUNO_API_KEY: z.string().optional(),
  
  // Payment
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID: z.string().optional(),
  
  // Marketing Services
  MAILERLITE_API_KEY: z.string().optional(),
  MAILERLITE_NEWSLETTER_GROUP_ID: z.string().optional(),
});

// Parse and validate environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

export default env.data;
