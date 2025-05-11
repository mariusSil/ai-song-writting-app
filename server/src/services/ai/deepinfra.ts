import env from '../../config/env';
import { AIModel, ChatMessage, LLMCompletionRequest, LLMCompletionResponse } from '../../types/ai';

/**
 * DeepInfra API service for interacting with language models including
 * Claude 3.7 Sonnet and Gemini 2.5 Pro
 */
export class DeepInfraService {
  private apiKey: string;
  private baseUrl: string = 'https://api.deepinfra.com/v1/openai';

  constructor() {
    this.apiKey = env.DEEPINFRA_API_KEY;
    if (!this.apiKey) {
      throw new Error('DEEPINFRA_API_KEY is required');
    }
  }

  /**
   * Translates our internal model names to DeepInfra model names
   */
  private getModelEndpoint(model: AIModel): string {
    switch (model) {
      case 'claude-3-sonnet-20240229':
        return 'anthropic/claude-3-sonnet-20240229';
      case 'gemini-1.5-pro-latest':
        return 'google/gemini-1.5-pro-latest';
      default:
        return 'anthropic/claude-3-sonnet-20240229'; // Default to Claude
    }
  }

  /**
   * Generate text completion using specified model
   */
  public async generateCompletion(request: LLMCompletionRequest): Promise<LLMCompletionResponse> {
    const modelEndpoint = this.getModelEndpoint(request.model);
    const apiUrl = `${this.baseUrl}/chat/completions`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: modelEndpoint,
          messages: request.messages,
          temperature: request.temperature || 0.7,
          max_tokens: request.maxTokens || 1024,
          stream: request.stream || false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`DeepInfra API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();

      return {
        id: data.id,
        content: data.choices[0].message.content,
        model: data.model,
      };
    } catch (error) {
      console.error('DeepInfra API error:', error);
      throw error;
    }
  }

  /**
   * Generate streaming completion (for real-time responses)
   */
  public async *generateStreamingCompletion(request: LLMCompletionRequest): AsyncGenerator<string> {
    const modelEndpoint = this.getModelEndpoint(request.model);
    const apiUrl = `${this.baseUrl}/chat/completions`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: modelEndpoint,
          messages: request.messages,
          temperature: request.temperature || 0.7,
          max_tokens: request.maxTokens || 1024,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`DeepInfra API error: ${errorData.error?.message || response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.trim() === 'data: [DONE]') continue;
          
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices[0]?.delta?.content || '';
              if (content) {
                yield content;
              }
            } catch (error) {
              console.error('Error parsing streaming response', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('DeepInfra streaming API error:', error);
      throw error;
    }
  }

  /**
   * Generate system and user prompts for songwriting assistance
   */
  public generateSongWritingPrompt(theme: string, mood?: string, language = 'english'): { system: string, user: string } {
    const system = `You are a professional songwriter and lyricist with expertise in writing songs in ${language}. 
Your goal is to help the user write high-quality lyrics that are creative, emotional, and authentic. 
Focus on creating rhymes, rhythmic patterns, and memorable phrases that fit the theme and mood of the song.`;

    const user = `I'm working on a song with the theme of "${theme}"${mood ? ` and a mood that's ${mood}` : ''}.
Please provide creative suggestions, rhyming options, and help me develop compelling lyrics.`;

    return { system, user };
  }
}
