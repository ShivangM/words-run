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

  const correctWordsArray = [];
  const incorrectWordsArray = [];

  let correctWords = 0;
  for (let i = 0; i < currentWords.length; i++) {
    if (originalWords.includes(currentWords[i])) {
      correctWords++;
      correctWordsArray.push(currentWords[i]);
    } else {
      incorrectWordsArray.push(currentWords[i]);
    }
  }

  const wordsPerMinute = parseInt((correctWords / timeInMinutes).toFixed(2));

  const accuracy = parseInt(
    ((correctWords / currentWords.length) * 100).toFixed(2)
  );

  return {
    wpm: wordsPerMinute,
    accuracy,
    correctWordsArray,
    incorrectWordsArray,
  };
};

export default calculateWordsPerMinute;
