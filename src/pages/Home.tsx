import GlobalLeaderBoards from '../components/Home/GlobalLeaderBoards';
import MultiplePlayerMode from '../components/Home/MultiplePlayerMode';
import PlayWithFriendsMode from '../components/Home/PlayWithFriendsMode';
import SinglePlayerMode from '../components/Home/SinglePlayerMode';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="p-6 sm:p-10">
      <div className="grid grid-cols-1 max-w-7xl mx-auto gap-8 md:grid-cols-2">
        <div className="grid grid-col-1 gap-6 md:grid-cols-1 lg:grid-cols-2 ">
          <div className="h-full w-full shadow-md shadow-secondary bg-primary2 rounded-xl row-span-1 col-span-2">
            <SinglePlayerMode />
          </div>
          <div className="h-full w-full shadow-md shadow-secondary bg-primary2 rounded-xl row-span-1 col-span-2 xl:col-span-1">
            <MultiplePlayerMode />
          </div>
          <div className="h-full w-full shadow-md shadow-secondary bg-primary2 rounded-xl row-span-1 col-span-2 xl:col-span-1">
            <PlayWithFriendsMode />
          </div>
        </div>

        <GlobalLeaderBoards />
        
      </div>
    </div>
  );
};

export default Home;
