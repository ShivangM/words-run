import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useLocation, useNavigate } from 'react-router-dom';

type Inputs = {
  dificulty: string;
  duration: string;
  mode: string;
  roomCode: string;
};

const data = [
  {
    content: 'Choose the difficulty level from the options provided.',
  },
  {
    content: 'Select the desired duration for the typing test.',
  },
  {
    content:
      'Type the displayed content as accurately and quickly as possible.',
  },
  {
    content: 'Focus on both speed and accuracy while typing.',
  },
  {
    content: 'Review your results at the end of the test.',
  },
  {
    content:
      'You can play the test again or try different difficulty levels and durations.',
  },
];

const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate('/game', { state: data });
  };

  const { state } = useLocation();
  const mode = watch('mode') || state.mode;

  return (
    <div className="">
      <div className="grid grid-cols-1 max-w-7xl mx-auto lg:grid-cols-2 gap-4 p-6 sm:p-10 h-full lg:h-screen">
        <div className="container rounded-xl bg-primary2 mx-auto p-4">
          <h1 className=" text text-secondary text-center text-3xl sm:text-4xl font-bold py-4">
            Game Settings
          </h1>

          <div className="container mx-auto p-4">
            <h1 className="text-xl sm:text-2xl text-center  mb-4">
              Choose Difficulty and Duration
            </h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="difficulty"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Difficulty Level:
                  </label>
                  <select
                    {...register('dificulty', {
                      required: 'Dificulty field is required',
                    })}
                    className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="dificulty"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="duration"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Duration:
                  </label>
                  <select
                    {...register('duration', {
                      required: 'Duration field is required',
                    })}
                    className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value={1}>1 Minute</option>
                    <option value={3}>3 Minutes</option>
                    <option value={5}>5 Minutes</option>
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="duration"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="duration"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Game Mode:
                  </label>
                  <select
                    {...register('mode', {
                      required: 'Duration field is required',
                      value: mode,
                    })}
                    className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="single">Single Player</option>
                    <option value="friends">Play With Friends</option>
                    <option value="online">Join Online</option>
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="duration"
                    render={({ message }) => <p>{message}</p>}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-black bg-secondary2 font-semibold transition-all duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
                >
                  Start Test
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="container rounded-xl space-y-6 bg-primary2 mx-auto p-4">
          <h1 className=" text text-secondary text-center text-4xl font-bold py-4">
            Typing Test Instructions
          </h1>
          <ul className="list-disc p-6 space-y-2 list-inside py-2">
            {data.map((item) => {
              return <li className="">{item.content}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
