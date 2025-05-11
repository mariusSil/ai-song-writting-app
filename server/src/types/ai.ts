export type AIModel = 'claude-3-sonnet-20240229' | 'gemini-1.5-pro-latest';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMCompletionRequest {
  model: AIModel;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface LLMCompletionResponse {
  id: string;
  content: string;
  model: string;
}

export interface RhymeSuggestion {
  word: string;
  type: 'noun' | 'verb' | 'adjective' | 'adverb' | 'other';
  score: number;
}

export interface RhymeRequest {
  word: string;
  count?: number;
  includeTypes?: boolean;
}

export interface RhymeResponse {
  original: string;
  suggestions: RhymeSuggestion[];
}

export interface SongResearchRequest {
  theme: string;
  mood?: string;
  genre?: string;
  language?: string;
  count?: number;
}

export interface SongPattern {
  pattern: string;
  frequency: number;
  examples: string[];
}

export interface SongResearchResponse {
  theme: string;
  rhymePatterns: SongPattern[];
  commonRhymes: string[];
  analysis: string;
}

// Context generation for AI
export interface SongContext {
  title?: string;
  description?: string;
  mood?: string;
  theme?: string;
  primaryLanguage: string;
  secondaryLanguage?: string;
  existingContent?: string[];
}

export interface ContextGenerationRequest {
  context: SongContext;
  requestType: 'suggestion' | 'completion' | 'rhyme' | 'pattern';
}

export interface ContextGenerationResponse {
  systemPrompt: string;
  userPrompt: string;
}
