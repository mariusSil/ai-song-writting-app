import { DeepInfraService } from './deepinfra';
import { PerplexityService } from './perplexity';
import { RhymeRequest, RhymeResponse, RhymeSuggestion } from '../../types/ai';

/**
 * RhymeSuggestion Service
 * Core service that powers the side panel AI writing assistant
 * Combines DeepInfra and Perplexity to provide high-quality rhyming suggestions
 * with word type categorization (verbs, nouns, etc.)
 */
export class RhymeSuggestionService {
  private deepInfra: DeepInfraService;
  private perplexity: PerplexityService;
  private rhymeCache: Map<string, RhymeResponse>;
  private categoryCache: Map<string, Record<string, string[]>>;

  constructor() {
    this.deepInfra = new DeepInfraService();
    this.perplexity = new PerplexityService();
    this.rhymeCache = new Map();
    this.categoryCache = new Map();
  }

  /**
   * Get rhyme suggestions for a word with categorization
   */
  public async getRhymeSuggestions(request: RhymeRequest): Promise<RhymeResponse> {
    const { word, count = 40, includeTypes = true } = request;
    const cacheKey = `${word}-${count}-${includeTypes}`;

    // Check cache first
    if (this.rhymeCache.has(cacheKey)) {
      return this.rhymeCache.get(cacheKey)!;
    }

    try {
      // Get rhymes from Perplexity service
      const rhymes = await this.perplexity.findRhymes(word, count);
      
      let suggestions: RhymeSuggestion[];

      if (includeTypes) {
        // Categorize words by type using DeepInfra LLM
        suggestions = await this.categorizeWords(rhymes);
      } else {
        // Skip categorization
        suggestions = rhymes.map(rhyme => ({
          word: rhyme,
          type: 'other',
          score: 1.0
        }));
      }

      // Score suggestions based on syllable match and phonetic quality
      suggestions = this.scoreSuggestions(word, suggestions);

      // Build response
      const response: RhymeResponse = {
        original: word,
        suggestions: suggestions.sort((a, b) => b.score - a.score).slice(0, count)
      };

      // Cache the response
      this.rhymeCache.set(cacheKey, response);
      
      return response;
    } catch (error) {
      console.error('Error generating rhyme suggestions:', error);
      throw error;
    }
  }

  /**
   * Categorize words by type (noun, verb, adjective, etc.)
   */
  private async categorizeWords(words: string[]): Promise<RhymeSuggestion[]> {
    // Check if we have cached categorizations
    const cacheKey = words.join('-');
    if (this.categoryCache.has(cacheKey)) {
      const categories = this.categoryCache.get(cacheKey)!;
      return Object.entries(categories).flatMap(([type, words]) => 
        words.map(word => ({ word, type: type as any, score: 1.0 }))
      );
    }

    try {
      const prompt = `Categorize each of these words as a noun, verb, adjective, adverb, or other. 
Format your response as a JSON object with category names as keys and arrays of words as values.
Words: ${words.join(', ')}`;

      const result = await this.deepInfra.generateCompletion({
        model: 'claude-3-sonnet-20240229',
        messages: [
          { role: 'system', content: 'You are a language expert assistant. Respond with ONLY the requested JSON format with no additional text.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1
      });

      // Extract JSON from response
      const content = result.content;
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;
      
      let categories: Record<string, string[]> = {
        noun: [],
        verb: [],
        adjective: [],
        adverb: [],
        other: []
      };

      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        try {
          const jsonContent = content.substring(jsonStart, jsonEnd);
          categories = JSON.parse(jsonContent);
        } catch (error) {
          console.error('Error parsing categories JSON:', error);
        }
      }

      // Cache the categorized words
      this.categoryCache.set(cacheKey, categories);

      // Transform to RhymeSuggestion array
      return Object.entries(categories).flatMap(([type, words]) => 
        words.map(word => ({ 
          word, 
          type: type as 'noun' | 'verb' | 'adjective' | 'adverb' | 'other', 
          score: 1.0 
        }))
      );
    } catch (error) {
      console.error('Error categorizing words:', error);
      // Fallback to uncategorized words
      return words.map(word => ({ word, type: 'other', score: 1.0 }));
    }
  }

  /**
   * Score suggestions based on syllable match and phonetic quality
   */
  private scoreSuggestions(originalWord: string, suggestions: RhymeSuggestion[]): RhymeSuggestion[] {
    return suggestions.map(suggestion => {
      // Basic scoring algorithm - this can be enhanced with more sophisticated phonetic analysis
      let score = 1.0;
      
      // Similar length words get higher score
      const lengthDiff = Math.abs(originalWord.length - suggestion.word.length);
      score -= lengthDiff * 0.05;
      
      // Similar endings get higher score
      const ending = (word: string) => word.slice(Math.max(0, word.length - 3));
      if (ending(originalWord.toLowerCase()) === ending(suggestion.word.toLowerCase())) {
        score += 0.2;
      }
      
      // Bonus for verb, noun, adjective (most useful for songwriting)
      if (['verb', 'noun', 'adjective'].includes(suggestion.type)) {
        score += 0.1;
      }
      
      return {
        ...suggestion,
        score: Math.max(0.1, Math.min(1.0, score))
      };
    });
  }

  /**
   * Get categorized rhyme suggestions with specified counts for each type
   */
  public async getCategorizedRhymes(
    word: string, 
    counts: Record<string, number> = { noun: 10, verb: 10, adjective: 10, adverb: 5, other: 5 }
  ): Promise<Record<string, RhymeSuggestion[]>> {
    const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const response = await this.getRhymeSuggestions({ word, count: totalCount, includeTypes: true });
    
    // Group by type
    const byType: Record<string, RhymeSuggestion[]> = {
      noun: [],
      verb: [],
      adjective: [],
      adverb: [],
      other: []
    };
    
    response.suggestions.forEach(suggestion => {
      if (byType[suggestion.type]) {
        byType[suggestion.type].push(suggestion);
      } else {
        byType.other.push(suggestion);
      }
    });
    
    // Limit by requested counts
    Object.keys(byType).forEach(type => {
      byType[type] = byType[type].slice(0, counts[type] || 5);
    });
    
    return byType;
  }
}
