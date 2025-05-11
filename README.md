# SiloTech AI-Powered Song Writing App

A sophisticated application that helps music creators write songs faster and better with AI assistance.

## Project Overview

SiloTech's AI-powered song writing app assists songwriters in their creative process. This application doesn't completely replace human creativity but serves as a powerful assistant to enhance and accelerate the songwriting process.

### Key Features

- **AI-Assisted Song Writing**: Leverage AI models (Claude 3.7 Sonnet and Gemini 2.5 Pro) to get contextual suggestions and improvements for lyrics
- **Rhyme Assistant Panel**: Interactive side panel that offers rhyming suggestions categorized by word type (verbs, nouns, etc.)
- **Song Research Engine**: Perplexity-powered background research of 100-200 songs on specific themes to analyze rhyme patterns
- **Multilingual Support**: Write songs in English, Mexican Spanish, Ukrainian, Lithuanian and other languages (excluding Russian), with support for language mixing
- **Project Management**: Create, organize, and manage multiple song projects with detailed context storage
- **Audio Integration**: Upload, record, and play music files while writing with real-time feedback
- **Suno AI Integration**: Generate beats and melodies based on detailed song descriptions
- **Voice Recording**: Low-latency streaming to headphones while recording with AI-powered post-processing
- **Light/Dark Theme**: Support for different visual preferences with internationalized font support
- **Subscription Model**: $10/month via Stripe integration with secure payment processing

## Technology Stack

- **Frontend**:
  - [Refine.dev](https://refine.dev/docs/) - React framework for building data-rich applications with TypeScript
  - Vite with TypeScript - Build tool and development server
  - [Ant Design](https://ant.design/) - UI library with rich components for text editing and form management
  - [@refinedev/antd](https://refine.dev/docs/ui-integrations/ant-design/components/ant-design-buttons/) - Refine's Ant Design integration
  - [react-markdown](https://github.com/remarkjs/react-markdown) - For comfortable writing experience with markdown support
  - [TailwindCSS](https://tailwindcss.com/) - For custom styling and responsive design
  - Theme switching with [tailwindcss-dark-mode](https://github.com/ChanceArthur/tailwindcss-dark-mode)
  - [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans) - Font with extensive language support

- **Backend**:
  - Node.js (v18+) with Express.js and TypeScript
  - Type-safe API development with OpenAPI 3.0 schema documentation
  - [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) with TypeScript interfaces
  - JWT authentication with [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - Rate limiting with [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)
  - [Zod](https://github.com/colinhacks/zod) for runtime type validation

- **AI Integration**:
  - [DeepInfra AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/deepinfra) for LLM integration
  - Claude 3.7 Sonnet and Gemini 2.5 Pro model support via DeepInfra
  - [Suno AI API](https://suno.gcui.ai/) for music generation (unofficial API)
  - [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and [WebRTC](https://webrtc.org/) for recording

- **Authentication**:
  - [Supabase Auth](https://supabase.com/docs/guides/auth/auth-email-passwordless) with email OTP (6-digit code)
  - Customized email templates for verification
  - JWT tokens with configurable expiration

- **Database**:
  - [Supabase](https://supabase.com/) PostgreSQL for structured data storage
  - [Supabase Realtime](https://supabase.com/docs/guides/realtime) for collaborative features
  - Debounce-based data sync with [use-debounce](https://github.com/xnimorz/use-debounce)
  - [pg](https://node-postgres.com/) for direct database access when needed

- **Audio Processing**:
  - [WebAudioRecorder.js](https://github.com/higuma/web-audio-recorder-js) for high-quality recording
  - [Tone.js](https://tonejs.github.io/) for audio manipulation and effects
  - [socket.io](https://socket.io/) for real-time audio streaming
  - [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) for client-side audio processing

- **Payment Processing**:
  - [Stripe Elements](https://stripe.com/docs/payments/elements) for secure payment form
  - [Stripe Customer Portal](https://stripe.com/docs/billing/subscriptions/customer-portal) for subscription management
  - [Stripe Webhooks](https://stripe.com/docs/webhooks) for event-driven payment updates

## Project Structure

```
ai-song-writing-app/
├── client/                     # Frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Application pages
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # Application entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend application
│   ├── src/
│   │   ├── api/                # API routes with OpenAPI schemas
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # Data models
│   │   ├── services/           # Business logic
│   │   │   ├── ai/             # AI integration services
│   │   │   ├── auth/           # Authentication services
│   │   │   ├── payment/        # Stripe integration
│   │   │   └── recording/      # Voice recording processing
│   │   ├── utils/              # Utility functions
│   │   └── index.js            # Application entry point
│   ├── package.json
│   └── openapi.yaml            # OpenAPI specification
│
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```

## Implementation Strategy

### 1. Project Setup (Week 1)
   - **Client Initialization**:
     - Create a new Vite project with Refine using the [superplate-cli](https://github.com/pankod/superplate)
     - Select Supabase as the data provider and auth provider
     - Configure Ant Design for UI components
     - Set up TailwindCSS for custom styling
     - Install additional dependencies (react-markdown, use-debounce, etc.)
   
   - **Server Initialization**:
     - Set up Express.js project structure with TypeScript
     - Implement OpenAPI schema definitions following the example from existing `/Users/mariussilenskis/Development/ai-agents/ai-agents-backend-service/src/api/index.ts`
     - Configure middleware (CORS, error handling, authentication)
     - Set up environment variables (.env files) with validation

   - **Supabase Setup**:
     - Create new Supabase project
     - Configure database schema for users, songs, and related entities
     - Set up email authentication with 6-digit OTP instead of magic links
     - Configure Supabase Row Level Security (RLS) policies for data protection

### 2. Authentication Implementation (Week 1-2)
   - **Email Auth Flow**:
     - Create custom email templates for OTP verification
     - Implement email verification with 6-digit code using [Supabase Auth Email OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless)
     - Add authentication middleware for protected routes
     - Implement JWT token management (issuance, validation, refresh)
   
   - **Frontend Auth Components**:
     - Create auth forms (sign-in, sign-up) with Refine and Ant Design
     - Implement OTP verification UI with auto-focus and validation
     - Add persistent login with secure token storage
     - Create protected route structure

### 3. Song Management System (Week 2-3)
   - **Database Structure**:
     - Design schema for songs, projects, versions, and user data
     - Implement Supabase tables with appropriate relations and constraints
     - Set up RLS policies for collaborative features (if required)
   
   - **CRUD Operations**:
     - Implement API endpoints for song creation, retrieval, update, and deletion
     - Create controllers with input validation using Zod
     - Add middleware for request/response handling
     - Implement debounce-based auto-save functionality
   
   - **Frontend Song Management**:
     - Build song library UI with filtering and sorting
     - Create new song project workflow
     - Implement project settings (title, description, mood, language settings)
     - Add file upload for music tracks

### 4. Song Editor Interface (Week 3-4)
   - **Text Editor Component**:
     - Implement line-by-line editing with custom editor component
     - Add markdown support for formatting
     - Implement auto-save with debounce (500ms delay)
     - Create context panel for project metadata (mood, description, etc.)
     - Add side panel AI writing assistant with rhyme suggestions
     - Implement categorized suggestions (verbs, nouns, etc.) with 10-20 options each
   
   - **Multilingual Support**:
     - Implement language selection with primary and secondary language options
     - Add font support for multiple character sets using Noto Sans
     - Create language mixing interface for style variations
     - Implement language-specific validation and suggestions

   - **Theme Implementation**:
     - Create light/dark theme switch using TailwindCSS
     - Implement theme persistence in user preferences
     - Ensure accessibility compliance for both themes

### 5. AI Integration (Week 4-5)
   - **LLM Integration**:
     - Set up DeepInfra AI SDK for serverless LLM access
     - Implement model switching between Claude 3.7 Sonnet and Gemini 2.5 Pro
     - Create context-aware prompting system for song writing assistance
     - Implement suggestion system for lyrics, rhymes, and themes
     - Build advanced rhyming engine with word category classification
     - Integrate Perplexity API for researching 100-200 songs on specific themes
     - Develop rhyme pattern analysis from existing songs to improve suggestions
   
   - **Suno AI Integration**:
     - Set up connection to Suno AI API for music generation
     - Create detailed prompt generation from song metadata
     - Implement beat generation workflow
     - Add version management for generated tracks

### 6. Audio Recording System (Week 5-6)
   - **Voice Recording**:
     - Implement Web Audio API and WebRTC for browser-based recording
     - Create real-time audio streaming to headphones with low latency
     - Add waveform visualization during recording
     - Implement multi-track recording capabilities
   
   - **Audio Processing**:
     - Add post-processing effects (compression, normalization, etc.)
     - Implement AI-powered enhancement options
     - Create voice modification features (pitch, autotune)
     - Add export options for different audio formats

### 7. Subscription System (Week 6-7)
   - **Stripe Integration**:
     - Set up Stripe account and API connection
     - Implement subscription plans ($10/month)
     - Create secure checkout flow with Stripe Elements
     - Set up webhook handlers for subscription events
   
   - **User Management**:
     - Implement subscription status checking
     - Create account management page
     - Add usage tracking and limits
     - Implement subscription cancellation flow

### 8. Testing and Deployment (Week 7-8)
   - **Testing Strategy**:
     - Implement unit tests for critical components
     - Add integration tests for API endpoints
     - Create end-to-end tests for user flows
     - Set up CI/CD pipeline
   
   - **Deployment**:
     - Configure production environment
     - Set up monitoring and logging
     - Implement error tracking
     - Create backup and recovery procedures

### 9. Final Touches and Launch (Week 8)
   - **Performance Optimization**:
     - Analyze and optimize frontend performance
     - Implement caching strategies
     - Optimize database queries
     - Add lazy loading for non-critical components
   
   - **Documentation**:
     - Create comprehensive API documentation
     - Write user guides and tutorials
     - Document codebase for future maintenance
     - Create deployment and operation manuals

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account and project
- Stripe account and test API keys
- DeepInfra API key
- Suno AI API access

### Environment Setup

Create the following `.env` files with these variables:

**.env.client**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**.env.server**
```
PORT=3000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
DEEPINFRA_API_KEY=your_deepinfra_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
SUNO_API_KEY=your_suno_api_key
```

### Database Schema

Create the following tables in Supabase:

**users**
```sql
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  subscription_status text default 'free' not null,
  subscription_id text,
  language_preference text default 'english' not null
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);
```

**songs**
```sql
create table public.songs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  title text not null,
  description text,
  mood text,
  primary_language text default 'english' not null,
  secondary_language text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  content jsonb default '[]' not null,
  is_archived boolean default false not null
);

-- Enable Row Level Security
alter table public.songs enable row level security;

-- Create policies
create policy "Users can CRUD their own songs" on public.songs
  for all using (auth.uid() = user_id);
```

**song_audio**
```sql
create table public.song_audio (
  id uuid default gen_random_uuid() primary key,
  song_id uuid references public.songs not null,
  audio_url text not null,
  audio_name text not null,
  audio_type text not null,
  created_at timestamp with time zone default now() not null,
  is_ai_generated boolean default false not null
);

-- Enable Row Level Security
alter table public.song_audio enable row level security;

-- Create policies
create policy "Users can CRUD their own audio files" on public.song_audio
  using (
    auth.uid() in (
      select user_id from public.songs where id = song_id
    )
  );
```

### Installation

1. Clone the repository
2. Install dependencies for both client and server
3. Set up environment variables
4. Run the development servers

```bash
# Create client project with TypeScript
mkdir -p client
cd client
npm create vite@latest . -- --template react-ts

# Install Refine and other dependencies
npm install @refinedev/core @refinedev/antd @refinedev/supabase @supabase/supabase-js antd @ant-design/icons tailwindcss postcss autoprefixer react-markdown use-debounce tone socket.io-client

# Initialize Tailwind CSS with TypeScript support
npx tailwindcss init -p --ts

# Create server project with TypeScript
cd ..
mkdir -p server
cd server
npm init -y
npm install express cors dotenv helmet express-rate-limit express-openapi-validator jsonwebtoken zod @supabase/supabase-js stripe socket.io ffmpeg-static uuid

# Set up TypeScript
npm install -D typescript ts-node @types/express @types/node @types/cors @types/jsonwebtoken @types/socket.io @types/uuid

# Initialize TypeScript configuration
npx tsc --init

# Run client
cd ../client
npm run dev

# Run server
cd ../server
npm run dev
```

### Initial Setup

After installation, you'll need to:

1. Configure Supabase authentication with email OTP
2. Set up Stripe subscription product and price
3. Configure OpenAPI schema
4. Set up deployment environment

## Technical Challenges and Solutions

### Low-Latency Voice Recording

The requirement for real-time voice monitoring requires a low-latency solution. We'll use WebRTC for direct audio streaming to minimize delay between recording and playback. The implementation includes:

- Using `getUserMedia()` to access microphone
- Creating an audio processing graph with Web Audio API
- Implementing a direct feedback loop for headphone monitoring
- Using AudioWorklet for performance-critical processing

### AI Model Integration

To support both Claude 3.7 Sonnet and Gemini 2.5 Pro models:

- We'll use DeepInfra's API which supports multiple models through a unified interface
- Implement server-side caching to reduce API costs
- Create adaptation layers to normalize outputs from different models
- Implement fallback mechanisms for API reliability

### Rhyme Engine & Song Research

For the advanced rhyming assistant and song research:

- Leverage Perplexity API to research 100-200 songs matching the user's theme or mood
- Build a rhyme pattern analyzer to extract common patterns from existing songs
- Create a categorized suggestion system (10-20 suggestions each for verbs, nouns, etc.)
- Implement a real-time rhyme finder that responds to the user's current writing context
- Develop a custom UI panel positioned to the side of the main editor for easy access

### Collaborative Editing

For real-time updates and collaboration:

- Leverage Supabase Realtime for database synchronization
- Implement optimistic UI updates with conflict resolution
- Use debounced updates to reduce write operations
- Create a versioning system for lyrics and song components

### Multilingual Support

To handle different languages and character sets:

- Use Noto Sans font family for broad language support
- Implement language detection for context-aware suggestions
- Create separate processing flows for different language pairs
- Build specialized prompts for AI based on language context

### Subscription Management

For secure handling of payments:

- Implement Stripe Billing with subscription lifecycle management
- Create secure checkout process following PCI compliance
- Add webhook handlers for subscription events and updates
- Implement proper subscription state management in the application

## License

MIT License

## Contributors

- SiloTech Team
