import { PiPencilCircleFill } from 'react-icons/pi';
import GameModeButton from './GameModeButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GameModes } from '../../interfaces/game.d';

type Props = {};

type Inputs = {
  difficulty: string;
};

const SinglePlayerMode = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-2xl lg:text-3xl font-semibold">
        Practice Your Typings{' '}
        <span>
          <PiPencilCircleFill className="inline pl-1" />
        </span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GameModeButton
          mode={GameModes.SINGLE_PLAYER}
          text="Start Practicing"
        />
      </form>
    </div>
  );
};

export default SinglePlayerMode;
