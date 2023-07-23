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
    <div className="flex p-4 w-fit space-x-4 rounded-lg md:space-x-6 bg-primary">
      <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-secondary2">
        <Icon className="h-9 w-9" />
      </div>
      <div className="flex flex-col justify-center align-middle">
        <p className="text-3xl font-semibold leadi">{value}</p>
        <p className="capitalize">{name}</p>
      </div>
    </div>
  );
};

const Status = () => {
  const [wpm, accuracy, timer] = useGameStore((state) => [
    state.wpm,
    state.accuracy,
    state.timer,
  ]);

  return (
    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
      <StatusCard name="Words / Min" value={wpm} Icon={BsSpeedometer2} />
      <StatusCard name="Accuracy" value={accuracy} Icon={BsCheck2Circle} />
      <StatusCard name="Time Remaining" value={timer} Icon={BiTimeFive} />
    </div>
  );
};

export default Status;
