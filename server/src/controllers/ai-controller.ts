import { Request, Response } from 'express';
import { RhymeSuggestionService } from '../services/ai/rhymeSuggestion';
import { DeepInfraService } from '../services/ai/deepinfra';
import { PerplexityService } from '../services/ai/perplexity';
import { SongResearchRequest } from '../types/ai';

export class AIController {
  private rhymeSuggestionService: RhymeSuggestionService;
  private deepInfraService: DeepInfraService;
  private perplexityService: PerplexityService;

  constructor() {
    this.rhymeSuggestionService = new RhymeSuggestionService();
    this.deepInfraService = new DeepInfraService();
    this.perplexityService = new PerplexityService();
  }

  /**
   * Get rhyme suggestions for a word
   */
  public getRhymeSuggestions = async (req: Request, res: Response): Promise<void> => {
    try {
      const { word } = req.params;
      const { count, includeTypes } = req.query;
      
      if (!word) {
        res.status(400).json({ error: 'Word parameter is required' });
        return;
      }

      const response = await this.rhymeSuggestionService.getRhymeSuggestions({
        word,
        count: count ? parseInt(count as string, 10) : undefined,
        includeTypes: includeTypes === 'true'
      });

      res.json(response);
    } catch (error) {
      console.error('Error in getRhymeSuggestions:', error);
      res.status(500).json({ error: 'Failed to get rhyme suggestions' });
    }
  };

  /**
   * Get categorized rhyme suggestions (10-20 suggestions per category)
   */
  public getCategorizedRhymes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { word } = req.params;
      const { nounCount, verbCount, adjectiveCount, adverbCount, otherCount } = req.query;
      
      if (!word) {
        res.status(400).json({ error: 'Word parameter is required' });
        return;
      }

      const counts = {
        noun: nounCount ? parseInt(nounCount as string, 10) : 10,
        verb: verbCount ? parseInt(verbCount as string, 10) : 10,
        adjective: adjectiveCount ? parseInt(adjectiveCount as string, 10) : 10,
        adverb: adverbCount ? parseInt(adverbCount as string, 10) : 5,
        other: otherCount ? parseInt(otherCount as string, 10) : 5
      };

      const response = await this.rhymeSuggestionService.getCategorizedRhymes(word, counts);
      res.json(response);
    } catch (error) {
      console.error('Error in getCategorizedRhymes:', error);
      res.status(500).json({ error: 'Failed to get categorized rhymes' });
    }
  };

  /**
   * Research songs based on theme for rhyme patterns
   */
  public researchSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      const { theme, mood, genre, language, count } = req.body as SongResearchRequest;
      
      if (!theme) {
        res.status(400).json({ error: 'Theme is required' });
        return;
      }

      const response = await this.perplexityService.researchSongs({
        theme,
        mood,
        genre,
        language,
        count: count || 100
      });

      res.json(response);
    } catch (error) {
      console.error('Error in researchSongs:', error);
      res.status(500).json({ error: 'Failed to research songs' });
    }
  };

  /**
   * Generate AI completion for a songwriting prompt
   */
  public generateSongCompletion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { 
        model, 
        messages, 
        temperature, 
        maxTokens,
        stream 
      } = req.body;
      
      if (!model || !messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Model and messages array are required' });
        return;
      }

      // If streaming is requested
      if (stream === true) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const generator = this.deepInfraService.generateStreamingCompletion({
          model,
          messages,
          temperature,
          maxTokens,
          stream: true
        });

        for await (const chunk of generator) {
          res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
        }

        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }

      // Non-streaming response
      const response = await this.deepInfraService.generateCompletion({
        model,
        messages,
        temperature,
        maxTokens
      });

      res.json(response);
    } catch (error) {
      console.error('Error in generateSongCompletion:', error);
      res.status(500).json({ error: 'Failed to generate song completion' });
    }
  };
}
