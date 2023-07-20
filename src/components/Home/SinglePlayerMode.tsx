import { PiPencilCircleFill } from 'react-icons/pi';
import GameModeButton from './GameModeButton';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {};

type Inputs = {
  dificulty: string;
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
      <h3 className="text-3xl font-semibold">
        Practice Your Typings{' '}
        <span>
          <PiPencilCircleFill className="inline pl-1" />
        </span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GameModeButton mode="single" text="Start Practicing" />
      </form>
    </div>
  );
};

export default SinglePlayerMode;
