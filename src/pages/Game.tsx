import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { GameModes, GameStatus } from '../interfaces/game.d';
import useGameStore from '../store/gameStore';
import WaitingScreen from '../components/Game/WaitingScreen';
import { toast } from 'react-toastify';
import Status from '../components/Game/Status';
import useUserStore from '../store/userStore';
import { socket } from '../utils/socket';
import Players from '../components/Home/Players';

type Props = {};

const Game = (props: Props) => {
  const [params] = useSearchParams();

  const [user] = useUserStore((state) => [state.user]);

  const [
    decrementTimer,
    timer,
    setMode,
    paragraph,
    gameStatus,
    loading,
    duration,
    typed,
    setTyped,
    endGame,
    setGameStatus,
    correctWordsArray,
    incorrectWordsArray,
    setPlayers,
    setRoomId,
    setOwner,
    mode,
    setProgress,
    setParagraph,
    setTimer,
    roomId,
  ] = useGameStore((state) => [
    state.decrementTimer,
    state.timer,
    state.setMode,
    state.paragraph,
    state.gameStatus,
    state.loading,
    state.duration,
    state.typed,
    state.setTyped,
    state.endGame,
    state.setGameStatus,
    state.correctWordsArray,
    state.incorrectWordsArray,
    state.setPlayers,
    state.setRoomId,
    state.setOwner,
    state.mode,
    state.setProgress,
    state.setParagraph,
    state.setTimer,
    state.roomId,
  ]);

  //Handles Loading
  useEffect(() => {
    if (loading) {
      toast.loading(loading, {
        toastId: 'loading',
      });
    } else {
      toast.dismiss('loading');
    }
    return () => {
      toast.dismiss('loading');
    };
  }, [loading]);

  //Handles Timer
  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      if (timer === 0) endGame();
      else {
        setTimeout(() => {
          decrementTimer();
        }, 1000);
      }
    }
  }, [gameStatus, decrementTimer, timer, endGame]);

  // Reset Game
  useEffect(() => {
    return () => {
      setGameStatus(GameStatus.WAITING);
    };
  }, [setGameStatus]);

  //Socket Events
  useEffect(() => {
    socket.on('activeUsers', (users) => {
      setPlayers(users);
    });

    socket.on('setOwner', (owner) => {
      setOwner(owner);
    });

    socket.on('gameStatus', ({ status, paragraph, timer }) => {
      setTimer(timer);
      setGameStatus(status);
      if (paragraph) setParagraph(paragraph);
    });

    socket.on('progressUpdate', ({ socketId, progress }) => {
      setProgress(progress, socketId);
    });

    return () => {
      setPlayers([]);
      socket.emit('exitRoom', roomId);
      socket.off('activeUsers');
      socket.off('setOwner');
      socket.off('gameStatus');
      socket.off('progressUpdate');
    };
  }, []);

  //Handles Room Id
  useEffect(() => {
    if (params.get('roomId')) {
      setRoomId(params.get('roomId')!);
      setMode(GameModes.WITH_FRIENDS);

      socket.emit('joinRoom', {
        roomId: params.get('roomId'),
        user: user,
      });
    }
  }, [user, params, setRoomId, setMode]);

  return (
    <div className="p-6 sm:p-10 relative">
      <motion.div
        style={{ scaleX: timer / duration }}
        className="absolute top-0 h-2 w-full bg-secondary left-0"
      />

      <div className="w-full flex items-center justify-center p-6 sm:p-10 bg-primary2 rounded-xl">
        {gameStatus === GameStatus.PLAYING ? (
          <div className="space-y-4">
            {mode !== GameModes.SINGLE_PLAYER && <Players />}
            <Status />
            <p className="text-sm w-full font-bold text-white">{paragraph}</p>
            <p className="text-sm flex items-center flex-wrap unselectable w-full gap-2 text-white">
              {typed?.split(' ').map((word, idx) => {
                return (
                  <span
                    key={idx}
                    className={`${
                      correctWordsArray.includes(word)
                        ? 'text-green-500'
                        : 'text-red-400'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>

            <textarea
              placeholder="Type the text here..."
              onPaste={(e) => {
                toast.error('Paste is not allowed');
                e.preventDefault();
              }}
              onChange={(e) => setTyped(e.target.value)}
              rows={8}
              value={typed}
              className="w-full outline-none border-none text-black p-2 rounded-xl"
            ></textarea>
          </div>
        ) : (
          <WaitingScreen />
        )}
      </div>
    </div>
  );
};

export default Game;
