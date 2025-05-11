import express from 'express';
import { AIController } from '../controllers/ai-controller';

const router = express.Router();
const aiController = new AIController();

/**
 * @openapi
 * /ai/rhymes/{word}:
 *   get:
 *     summary: Get rhyme suggestions for a word
 *     description: Returns a list of words that rhyme with the provided word
 *     parameters:
 *       - name: word
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: count
 *         in: query
 *         schema:
 *           type: integer
 *           default: 40
 *       - name: includeTypes
 *         in: query
 *         schema:
 *           type: boolean
 *           default: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RhymeResponse'
 */
router.get('/rhymes/:word', aiController.getRhymeSuggestions);

/**
 * @openapi
 * /ai/categorized-rhymes/{word}:
 *   get:
 *     summary: Get categorized rhyme suggestions
 *     description: Returns rhyme suggestions categorized by word type (nouns, verbs, etc.)
 *     parameters:
 *       - name: word
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: nounCount
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: verbCount
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: adjectiveCount
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: adverbCount
 *         in: query
 *         schema:
 *           type: integer
 *           default: 5
 *       - name: otherCount
 *         in: query
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 noun:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RhymeSuggestion'
 *                 verb:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RhymeSuggestion'
 *                 adjective:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RhymeSuggestion'
 *                 adverb:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RhymeSuggestion'
 *                 other:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RhymeSuggestion'
 */
router.get('/categorized-rhymes/:word', aiController.getCategorizedRhymes);

/**
 * @openapi
 * /ai/research-songs:
 *   post:
 *     summary: Research songs based on theme
 *     description: Analyzes songs with similar themes to extract rhyme patterns and common rhymes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SongResearchRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SongResearchResponse'
 */
router.post('/research-songs', aiController.researchSongs);

/**
 * @openapi
 * /ai/generate:
 *   post:
 *     summary: Generate AI completion for songwriting
 *     description: Uses AI models to generate song lyric suggestions or completions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 enum: [claude-3-sonnet-20240229, gemini-1.5-pro-latest]
 *               messages:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ChatMessage'
 *               temperature:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 1
 *               maxTokens:
 *                 type: integer
 *               stream:
 *                 type: boolean
 *             required:
 *               - model
 *               - messages
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LLMCompletionResponse'
 */
router.post('/generate', aiController.generateSongCompletion);

export default router;
