import GlobalLeaderBoards from '../components/Home/GlobalLeaderBoards';
import MultiplePlayerMode from '../components/Home/MultiplePlayerMode';
import PlayWithFriendsMode from '../components/Home/PlayWithFriendsMode';
import SinglePlayerMode from '../components/Home/SinglePlayerMode';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="min-h-screen p-10">
      <div className="grid grid-cols-3 h-screen gap-8">
        <div className="grid grid-cols-2 col-span-2 grid-rows-2 h-full gap-6">
          <div className="row-span-1 col-span-2 h-full w-full shadow-md shadow-secondary bg-primary2 rounded-xl">
            <SinglePlayerMode />
          </div>
          <div className="row-span-1 col-span-1 h-full w-full shadow-md shadow-secondary bg-primary2 rounded-xl">
            <MultiplePlayerMode />
          </div>
          <div className="row-span-1 col-span-1 h-full w-full shadow-md shadow-secondary bg-primary2 rounded-xl">
            <PlayWithFriendsMode />
          </div>
        </div>

        <GlobalLeaderBoards />
        
      </div>
    </div>
  );
};

export default Home;
