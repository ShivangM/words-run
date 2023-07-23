import { GameModes } from '../interfaces/game.d';
import useGameStore from '../store/gameStore';
import useGameSettings from '../hooks/useGameSettings';

const CreateRoom = () => {
  const [setMode, setDuration, setDificulty, loading, mode] = useGameStore(
    (state) => [
      state.setMode,
      state.setDuration,
      state.setDificulty,
      state.loading,
      state.mode,
    ]
  );

  const { instructions, buttonName, modeName, handleSubmit } =
    useGameSettings();

  return (
    <div className="">
      <div className="grid grid-cols-1 max-w-7xl mx-auto lg:grid-cols-2 gap-4 p-6 sm:p-10 h-full lg:h-screen">
        <div className="container rounded-xl bg-primary2 mx-auto p-4">
          <div className="space-y-2">
            <h1 className=" text text-secondary text-center text-3xl sm:text-4xl font-bold">
              Game Settings
            </h1>
            <p className="text-xl sm:text-xl text-center">
              Choose Difficulty and Duration
            </p>
          </div>

          <div className="container mt-4 mx-auto p-0 sm:p-4">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="difficulty"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Difficulty Level:
                  </label>
                  <select
                    onChange={(e) => {
                      setDificulty(parseInt(e.target.value));
                    }}
                    className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="duration"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Duration:
                  </label>
                  <select
                    onChange={(e) => {
                      setDuration(parseInt(e.target.value));
                    }}
                    className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value={60}>1 Minute</option>
                    <option value={180}>3 Minutes</option>
                    <option value={300}>5 Minutes</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="duration"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Game Mode:
                  </label>
                  <select
                    onChange={(e) => {
                      setMode(parseInt(e.target.value));
                    }}
                    value={mode}
                    className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value={GameModes.SINGLE_PLAYER}>
                      Single Player
                    </option>
                    <option value={GameModes.WITH_FRIENDS}>
                      Play With Friends
                    </option>
                    <option value={GameModes.ONLINE}>Join Online</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading !== null}
                  className="w-full disabled:animate-pulse disabled:cursor-not-allowed text-black bg-secondary2 font-semibold transition-all duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
                >
                  {buttonName}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="container rounded-xl space-y-6 bg-primary2 mx-auto p-4">
          <div className="space-y-2">
            <h1 className=" text text-secondary text-center text-3xl sm:text-4xl font-bold">
              Instructions
            </h1>
            <p className="text-xl sm:text-xl text-center">
              {modeName} Mode Instructions
            </p>
          </div>
          <ul className="list-disc text-sm sm:text-base p-0 sm:p-6 space-y-2 list-inside">
            {instructions.map((instruction) => {
              return <li className="">{instruction}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
