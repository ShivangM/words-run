const fetchParagraphForGame = async (difficulty: string, duration: number) => {
  const response = await fetch(
    `http://localhost:5000/api/game/fetchParagraph`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty, duration }),
    }
  );
  const data = await response.json();
  return data.paragraph;
};

export default fetchParagraphForGame;
