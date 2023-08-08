import { toast } from 'react-toastify';
import useGameStore from '../../store/gameStore';
import Status from './Status';
import { useEffect } from 'react';
import { RoomStatus } from '../../interfaces/room.d';

type Props = {};

const PlayingScreen = (props: Props) => {
  const [room, typed, setTyped, userProgress, resetProgress] = useGameStore(
    (state) => [
      state.room,
      state.typed,
      state.setTyped,
      state.userProgress,
      state.resetProgress,
    ]
  );

  // useEffect(() => {
  //   return () => {
  //     if (room?.status !== RoomStatus.FINISHED) resetProgress();
  //   };
  // }, []);

  return (
    <div className="space-y-4">
      <Status />

      <p className="text-sm w-full font-bold text-white">{room?.paragraph}</p>

      <p className="text-sm flex items-center flex-wrap unselectable w-full gap-2 text-white">
        {typed?.split(' ').map((word, idx) => {
          return (
            <span
              key={idx}
              className={`${
                userProgress?.correctWordsArray.includes(word)
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
      />
    </div>
  );
};

export default PlayingScreen;
