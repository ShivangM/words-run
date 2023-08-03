import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useGameStore from '../store/gameStore';
import WaitingScreen from '../components/Game/WaitingScreen';
import { toast } from 'react-toastify';
import useUserStore from '../store/userStore';
import { socket } from '../utils/socket';
import { RoomStatus } from '../interfaces/room.d';
import PlayingScreen from '../components/Game/PlayingScreen';
import { GameModes } from '../interfaces/game.d';
import Players from '../components/Home/Players';
import getDuration from '../utils/getDuration';

type Props = {};

const Game = (props: Props) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const hasJoinedRoom = useRef(false);

  const [user] = useUserStore((state) => [
    state.user,
    state.setName,
    state.setPhoto,
    state.setUid,
  ]);

  const [room, updateRoom, joinRoom, exitRoom, loading, error] = useGameStore(
    (state) => [
      state.room,
      state.updateRoom,
      state.joinRoom,
      state.exitRoom,
      state.loading,
      state.error,
    ]
  );

  //Handles Loading && Errors
  useEffect(() => {
    if (loading) {
      toast.loading(loading, {
        toastId: 'loading',
      });
    } else {
      toast.dismiss('loading');
    }

    if (error !== null) {
      toast.error(error.message);
      navigate('/');
    }

    return () => {
      toast.dismiss('loading');
    };
  }, [loading, error, navigate]);

  //Socket Events
  useEffect(() => {
    socket.on('updateRoom', (room) => {
      updateRoom(room);

      if (!room?.users || room?.users?.length === 0) {
        navigate('/');
      }
    });

    socket.on('roomError', (error) => {
      toast.error(error);
      navigate('/');
    });

    return () => {
      // exitRoom();
      socket.off('updateRoom');
      socket.off('roomError');
    };
  }, []);

  //Handles Room Id
  useEffect(() => {
    const roomId = params.get('roomId');

    if (roomId && !hasJoinedRoom.current && user.socketId) {
      joinRoom(roomId, user);
      hasJoinedRoom.current = true;
    }
  }, [params, user, joinRoom, exitRoom]);

  return (
    <div className="p-6 sm:p-10 relative">
      {room?.status === RoomStatus.PLAYING ? (
        <motion.div
          style={{
            scaleX: room?.timer! / getDuration(room?.gameSettings?.duration),
          }}
          className="absolute top-0 h-2 w-full bg-secondary left-0"
        />
      ) : null}

      <div className="max-w-7xl mx-auto lg:p-10 h-full lg:max-h-[680px] lg:h-screen space-y-4 flex flex-col items-center justify-center p-6 sm:p-10 bg-primary2 rounded-xl">
        {room?.gameSettings?.mode !== GameModes.SINGLE_PLAYER ||
        room?.status !== RoomStatus.PLAYING ? (
          <Players />
        ) : null}

        {room?.status === RoomStatus.PLAYING ? (
          <PlayingScreen />
        ) : (
          <WaitingScreen />
        )}
      </div>
    </div>
  );
};

export default Game;
