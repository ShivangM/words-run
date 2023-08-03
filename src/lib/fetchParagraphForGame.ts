import { GameDifficulties, GameDuration } from '../interfaces/game.d';
import getDifficulty from '../utils/getDifficulty';
import getDuration from '../utils/getDuration';
import getFallbackParagraph from '../utils/getFallbackParagraph';
import openai from '../utils/openAI';

const fetchParagraphForGame = async (
  difficulty: GameDifficulties,
  duration: GameDuration
) => {
  const response = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: 'system',
          content: `When responding, only send the paragraph that is generated, dont send anything else.`,
        },
        {
          role: 'user',
          content: `Write a paragraph for typing test with ${getDifficulty(
            difficulty
          )} difficulty and long enough for ${getDuration(duration)} seconds.`,
        },
      ],
    })
    .then((res) => res.data)
    .then((res) => res.choices[0].message)
    .then((res) => res?.content)
    .catch((err) => {
      console.error(err);
      return getFallbackParagraph(difficulty, duration);
    });

  return response;
};

export default fetchParagraphForGame;
