type Props = {};

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-5 "
    viewBox="0 0 20 20"
    fill="currentColor"
    
  >
    <path
      fillRule="evenodd"
      d="M10 0a5 5 0 100 10 5 5 0 000-10zm0 13a7 7 0 100-14 7 7 0 000 14zM6.293 9.293a1 1 0 111.414-1.414 3 3 0 104.472 0 1 1 0 111.414 1.414 5 5 0 11-7.3 0z"
      clipRule="evenodd"
    />
  </svg>
);

const LeaderBoardRow = () => {
  return (
    <tr className="even:bg-gray-300 odd:bg-white">
      <td className=" text-black">1</td>
      <td className=" text-black flex items-center">
        <UserIcon /> {/* Add the user icon here */}
        Leg2.O
      </td>
      <td className=" text-black">196</td>
    </tr>
  );
};

const GlobalLeaderBoards = (props: Props) => {
  return (
    <div className="w-full col-span-1 rounded-xl flex flex-col py-8 items-center bg-white h-full">
      <h3 className="font-bold text-primary text-3xl">Global Leaderboards</h3>
      <table className="w-full text-center table-auto">
        <thead>
          <tr>
            <th className="py-2 text-black">Rank</th>
            <th className="py-2 text-black">User</th>
            <th className="py-2 text-black">Avg. Speed</th>
          </tr>
        </thead>
        <tbody>
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
          <LeaderBoardRow />
        </tbody>
      </table>
    </div>
  );
};

export default GlobalLeaderBoards;
