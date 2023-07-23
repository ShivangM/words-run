import { GameDifficulties, GameDuration } from '../interfaces/game.d';
import openai from '../utils/openAI';

const fetchParagraphForGame = async (
  difficulty: GameDifficulties,
  duration: GameDuration
) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: `When responding, act as paragraph generator. For example, if you are given a prompt of "Write a paragraph for typing test with easy difficulty and long enough for 60 seconds", you should respond with a paragraph with easy difficulty. Also, please make sure that your paragraph is long enough for 60 seconds. Directly start response with with paragraph.`,
      },
      {
        role: 'user',
        content: `Write a paragraph for typing test with ${
          difficulty === 0 ? 'ease' : difficulty === 1 ? 'medium' : 'hard'
        } difficulty and long enough for ${duration} seconds.`,
      },
    ],
  });

  const paragraph = response?.data?.choices[0]?.message;
  return paragraph;
};

export default fetchParagraphForGame;
