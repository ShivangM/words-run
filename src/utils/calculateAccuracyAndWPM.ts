const calculateWordsPerMinute = (
  originalText: string,
  currentText: string,
  timeInMinutes: number
) => {
  const currentWords = currentText.trim().split(/\s+/);
  const originalWords = originalText
    .trim()
    .split(/\s+/)
    .slice(0, currentWords.length);

  let correctWords = 0;
  for (let i = 0; i < currentWords.length; i++) {
    if (originalWords.includes(currentWords[i])) {
      correctWords++;
    }
  }

  const wordsPerMinute = parseInt((correctWords / timeInMinutes).toFixed(2));

  const accuracy = parseInt(
    ((correctWords / currentWords.length) * 100).toFixed(2)
  );

  return { wordsPerMinute, accuracy };
};

export default calculateWordsPerMinute;
