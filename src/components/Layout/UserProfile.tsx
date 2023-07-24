import useUserStore from '../../store/userStore';
import dummyImage from '../../assets/Dummy Profile.png';

type Props = {};

const UserProfile = (props: Props) => {
  const [user, setName] = useUserStore((state) => [state.user, state.setName]);
  if (!user) return null;

  const { displayName, photoURL, stats } = user!;
  const { averageWpm, races } = stats || { averageWpm: 0, races: 0 };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-4 items-end">
        <img
          src={photoURL || dummyImage}
          alt={displayName || 'Guest'}
          className="w-12 h-12 rounded-lg"
        />
        <div className="flex flex-col">
          <input
            value={displayName ? displayName : ''}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="text-white text-lg bg-transparent border border-white rounded-lg px-2 py-0.5 font-semibold"
          />
          <div className="flex text-xs items-center space-x-2">
            <span>AVG WPM: {averageWpm}</span>
            <span>GAMES: {races}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
