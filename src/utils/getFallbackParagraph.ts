import { GameDifficulties, GameDuration } from '../interfaces/game.d';

const paragraphs = [
  // Easy difficulty
  [
    'The sun was shining brightly in the clear blue sky. A gentle breeze rustled the leaves of the trees, creating a soothing melody. Birds chirped and flitted about, adding to the picturesque scene. Nearby, a river flowed calmly, reflecting the beauty of the surroundings. It was a perfect day for a leisurely stroll in nature.',

    'The sky was a serene shade of blue, adorned with fluffy white clouds. A gentle breeze swayed the flowers, releasing their sweet fragrance into the air. Birds sang merrily, creating a joyful symphony in the background. It was a day that seemed tailor-made for relaxation and tranquility.',

    'The sun hung low in the sky, casting a warm, orange hue across the horizon. As evening approached, the world seemed to slow down, embracing a sense of calm. Trees stood still as if in meditation, their leaves gently rustling in the breeze. Birds soared gracefully, painting arcs in the air as they went about their evening rituals. It was a scene of quiet beauty, a moment to appreciate the simple wonders of nature.',
  ],
  // Medium difficulty
  [
    'As the clock ticked away, the pressure was on. The clacking of keys filled the room as participants focused intently on their screens. Every word typed was a step closer to the goal. Concentration was key; even a momentary lapse could lead to errors. The typing rhythm became almost meditative, a dance of fingers across the keyboard. Time seemed to both fly and stand still. Only the skilled would emerge triumphant in this test of typing prowess.',

    `In the heart of the bustling city, life moved at a relentless pace. People hurried down the streets, lost in their own thoughts and destinations. Horns honked, and the distant hum of conversations filled the air. Amidst this chaos, a sense of purpose and energy thrived, reminding everyone of the city's vibrant heartbeat.`,

    'In the heart of the bustling city, where skyscrapers reach for the heavens, life pulses with a rhythm that is both frenetic and invigorating. People rush through the streets, driven by their ambitions and dreams. Car horns and chatter weave together into a tapestry of urban symphony. Amidst this organized chaos, a sense of unity emerges—the collective pursuit of progress and purpose.',
  ],
  // Hard difficulty
  [
    'In the realm of advanced typists, where keystrokes meld with thought, a symphony of letters unfolds. The QWERTY keyboard, though archaic in design, becomes a canvas for wordsmiths who navigate its intricacies with finesse. Fingers dance, almost possessed by an unseen force, crafting sentences with a fluidity that borders on art. But amidst this elegance lies a battlefield of typographical errors. One must tread with caution, for inaccuracy lurks like a shadow. Only those with a mastery of both mind and hand can emerge victorious, having conquered the Everest of typing challenges.',

    `In the labyrinth of intricate codes and commands, programmers navigate with a blend of logic and creativity. Each keystroke is a brushstroke, painting a digital canvas that brings ideas to life. The compiler's response is a symphony of success or a discordant error message. Patience and skill are the tools of the coder's trade, forging pathways through the digital frontier.`,

    `The cosmos, a canvas of boundless wonder, beckons humanity's curiosity. Galaxies like islands of light populate the void, each harboring billions of stars and their untold stories. Black holes, cosmic anomalies with insatiable appetites, lurk in the cosmic shadows. And then there's dark matter, the elusive enigma that composes most of the universe's mass, yet evades our gaze. Exploring the cosmos is a journey of unraveling mysteries, a journey where technology and imagination intertwine.`,
  ],
];

const getFallbackParagraph = (
  difficulty: GameDifficulties,
  duration: GameDuration
) => {
  console.log(difficulty, duration);
  return paragraphs[difficulty][duration];
};

export default getFallbackParagraph;
