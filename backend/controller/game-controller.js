const openai = require('../utils/openAI');

exports.fetchParagraphFromGPT = async (req, res) => {
  if (req.body.duration === undefined) {
    res.status(400).json('Error: Paragraph not found');
  }

  if (req.body.difficulty === undefined) {
    res.status(400).json('Error: Difficulty level not found');
  }

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content:
          'When responding, act as you are taking tying test of some user.',
      },
      {
        role: 'user',
        content: `Generate a paragraph for ${req.body.duration} seconds with ${req.body.difficulty} difficulty. act as you are taking tying test of some user. Directly start your answer with the paragraph.`,
      },
    ],
  });

  const data = response?.data;
  res.json({
    status: true,
    message: `Paragraph generated for ${req.body.duration} minutes with ${req.body.difficulty} difficulty.`,
    paragraph: data?.choices[0]?.message,
  });
};
