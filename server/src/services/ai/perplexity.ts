import env from '../../config/env';
import { SongResearchRequest, SongResearchResponse, SongPattern } from '../../types/ai';

/**
 * Perplexity API Service for deep song research
 * This leverages your existing Perplexity API key to research songs based on themes
 * and extract rhyme patterns and common rhymes to improve suggestions
 */
export class PerplexityService {
  private apiKey: string;
  private baseUrl: string = 'https://api.perplexity.ai';
  private model: string = 'pplx-70b-online'; // Using online model for research capabilities

  constructor() {
    this.apiKey = env.PERPLEXITY_API_KEY;
    if (!this.apiKey) {
      throw new Error('PERPLEXITY_API_KEY is required');
    }
  }

  /**
   * Research songs based on theme, mood, and genre to extract rhyme patterns
   */
  public async researchSongs(request: SongResearchRequest): Promise<SongResearchResponse> {
    const { theme, mood, genre, language = 'english', count = 100 } = request;
    
    const prompt = this.buildResearchPrompt(theme, mood, genre, language, count);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a music researcher and language expert specializing in analyzing song structures, rhyme patterns, and lyrical themes. Provide detailed, structured analysis in JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2, // Lower temperature for more structured responses
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Perplexity API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Extract JSON from the response
      try {
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}') + 1;
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          const jsonContent = content.substring(jsonStart, jsonEnd);
          const parsedData = JSON.parse(jsonContent);
          
          return this.formatResearchResponse(parsedData, theme);
        }
      } catch (error) {
        console.error('Error parsing JSON from Perplexity response:', error);
      }
      
      // Fallback to manual parsing if JSON extraction fails
      return this.parseUnstructuredResponse(content, theme);
    } catch (error) {
      console.error('Perplexity API error:', error);
      throw error;
    }
  }

  /**
   * Build the research prompt for Perplexity
   */
  private buildResearchPrompt(
    theme: string, 
    mood?: string, 
    genre?: string,
    language = 'english',
    count = 100
  ): string {
    return `Research ${count} popular songs in ${language} that focus on the theme of "${theme}"${
      mood ? ` with a ${mood} mood` : ''
    }${genre ? ` in the ${genre} genre` : ''}.

Analyze these songs and extract:
1. Common rhyme patterns (e.g., AABB, ABAB) and their frequency
2. Most common rhyming words related to this theme
3. Examples of particularly effective rhymes and lyrical structures

Format your response as a structured JSON with the following fields:
- "theme": The theme analyzed
- "rhymePatterns": Array of objects containing "pattern", "frequency" (as a percentage), and "examples" (array of short excerpts)
- "commonRhymes": Array of common rhyming word pairs or groups found in these songs
- "analysis": Brief text summary of findings

The goal is to help a songwriter find effective rhyme patterns and rhyming words for a song on this theme.`;
  }

  /**
   * Format research response to standard structure
   */
  private formatResearchResponse(data: any, theme: string): SongResearchResponse {
    // Create default response structure
    const response: SongResearchResponse = {
      theme: theme,
      rhymePatterns: [],
      commonRhymes: [],
      analysis: data.analysis || 'Analysis not available',
    };

    // Process rhyme patterns
    if (Array.isArray(data.rhymePatterns)) {
      response.rhymePatterns = data.rhymePatterns.map((pattern: any): SongPattern => ({
        pattern: pattern.pattern,
        frequency: pattern.frequency || 0,
        examples: Array.isArray(pattern.examples) ? pattern.examples : [],
      }));
    }

    // Process common rhymes
    if (Array.isArray(data.commonRhymes)) {
      response.commonRhymes = data.commonRhymes;
    }

    return response;
  }

  /**
   * Parse unstructured response as fallback
   */
  private parseUnstructuredResponse(content: string, theme: string): SongResearchResponse {
    // Create default response
    const response: SongResearchResponse = {
      theme,
      rhymePatterns: [],
      commonRhymes: [],
      analysis: 'Analysis derived from unstructured response',
    };

    // Extract rhyme patterns
    const patternRegex = /([A-Z]{4,})\s+pattern/gi;
    const patterns = new Set<string>();
    let match;
    
    while ((match = patternRegex.exec(content)) !== null) {
      patterns.add(match[1]);
    }
    
    response.rhymePatterns = Array.from(patterns).map(pattern => ({
      pattern,
      frequency: 0,
      examples: [],
    }));

    // Extract common rhymes - look for words that appear after "rhyme", "rhymes", "rhyming"
    const rhymeRegex = /\b(rhym\w+)\b\s+(\w+)\s+(?:and|with)\s+(\w+)/gi;
    const rhymePairs = new Set<string>();
    
    while ((match = rhymeRegex.exec(content)) !== null) {
      if (match[2] && match[3]) {
        rhymePairs.add(`${match[2]} - ${match[3]}`);
      }
    }
    
    response.commonRhymes = Array.from(rhymePairs);

    // Extract analysis summary
    const analysisParagraphs = content.split('\n\n').filter(p => 
      p.toLowerCase().includes('analysis') || 
      p.toLowerCase().includes('summary') || 
      p.toLowerCase().includes('conclusion')
    );
    
    if (analysisParagraphs.length > 0) {
      response.analysis = analysisParagraphs[0];
    }

    return response;
  }

  /**
   * Research specific rhyming words for a given word
   */
  public async findRhymes(word: string, count = 20): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a language expert specializing in rhymes and wordplay. Provide responses in JSON format.'
            },
            {
              role: 'user',
              content: `Find ${count} words that rhyme with "${word}". Return ONLY a JSON array of strings with no additional text.`
            }
          ],
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Perplexity API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Try to parse the response as JSON
      try {
        const jsonStart = content.indexOf('[');
        const jsonEnd = content.lastIndexOf(']') + 1;
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          const jsonContent = content.substring(jsonStart, jsonEnd);
          return JSON.parse(jsonContent);
        }
      } catch (error) {
        console.error('Error parsing JSON from Perplexity response:', error);
      }
      
      // Fallback to parsing as text
      return content
        .split(/[\n,]/)
        .map(line => {
          const word = line.trim().replace(/[^a-zA-Z]/g, '');
          return word.length > 0 ? word : null;
        })
        .filter(Boolean) as string[];
    } catch (error) {
      console.error('Perplexity API error during rhyme search:', error);
      throw error;
    }
  }
}
