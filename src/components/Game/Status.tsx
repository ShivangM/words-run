import { BsSpeedometer2, BsCheck2Circle } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';
import useGameStore from '../../store/gameStore';

type Props = {
  name: string;
  value: number;
  Icon: IconType;
};

const StatusCard = ({ name, value, Icon }: Props) => {
  return (
    <div className="flex p-2 sm:p-4 w-fit space-x-2 rounded-lg md:space-x-6 bg-primary">
      <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-secondary2">
        <Icon className="h-6 w-6 sm:h-9 sm:w-9" />
      </div>
      <div className="flex flex-col justify-center align-middle">
        <p className="text-2xl sm:text-3xl font-semibold">{value}</p>
        <p className="capitalize whitespace-nowrap">{name}</p>
      </div>
    </div>
  );
};

const Status = () => {
  const [wpm, accuracy, timer] = useGameStore((state) => [
    state.userProgress?.wpm,
    state.userProgress?.accuracy,
    state.room?.timer,
  ]);

  return (
    <div className="flex flex-wrap max-w-2xl items-center gap-2 sm:gap-4">
      <StatusCard name="Words / Min" value={wpm || 0} Icon={BsSpeedometer2} />
      <StatusCard name="Accuracy" value={accuracy || 0} Icon={BsCheck2Circle} />
      <StatusCard name="Time Remaining" value={timer || 0} Icon={BiTimeFive} />
    </div>
  );
};

export default Status;
