import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {};

const Game = (props: Props) => {
  const { state } = useLocation();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="p-10 relative">
      <motion.div
        style={{ scaleX: 0.6 }}
        className="absolute top-0 h-2 w-full bg-secondary left-0"
      />
      <div className="w-full h-96 bg-primary2 rounded-xl"></div>
    </div>
  );
};

export default Game;
