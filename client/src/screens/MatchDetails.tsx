import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import dotaApiService from "../services/DotaApi";
import MatchDetailsItem from "../components/MatchDetailsItem";
import BackButton from "../components/Backbutton";

const MatchDetails = () => {
  const [details, setDetails] = useState<any[]>([]);
  const [score, setScore] = useState<number[]>([]);
  const [res, setRes] = useState<boolean>(false);
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    dotaApiService.getMatch!(id).then((res) => {
      setDetails(res.players);
      setScore([res.radiant_score, res.dire_score]);
      setRes(res.players[0].radiant_win);
    });
  }, [id]);

  const victoryClass = res ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <BackButton></BackButton>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold">
          {score[0]} - {score[1]}
        </h1>
        <h2 className={`${victoryClass} text-xl font-bold mt-2`}>
          {" "}
          {res ? "RADIANT VICTORY" : "DIRE VICTORY"}{" "}
        </h2>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-green-300 mb-4">
          The Radiant
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-800 shadow-md rounded-lg">
            <thead className="bg-gray-700 text-gray-400 uppercase text-xs">
              <tr>
                <th className="py-1 px-2">Hero</th>
                <th className="py-1 px-2">Player</th>
                <th className="py-1 px-2">K</th>
                <th className="py-1 px-2">D</th>
                <th className="py-1 px-2">A</th>
                <th className="py-1 px-2">Net</th>
                <th className="py-1 px-2">LH</th>
                <th className="py-1 px-2">DN</th>
                <th className="py-1 px-2">GPM</th>
                <th className="py-1 px-2">XPM</th>
                <th className="py-1 px-2">DMG</th>
                <th className="py-1 px-2">HEAL</th>
                <th className="py-1 px-2">BLD</th>
                <th className="py-1 px-2">Items</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm divide-y divide-gray-700">
              {details.slice(0, 5).map((player, i) => (
                <MatchDetailsItem key={i} player={player} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-red-300 mb-4">The Dire</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-800 shadow-md rounded-lg">
            <thead className="bg-gray-700 text-gray-400 uppercase text-xs">
              <tr>
                <th className="py-1 px-2">Hero</th>
                <th className="py-1 px-2">Player</th>
                <th className="py-1 px-2">K</th>
                <th className="py-1 px-2">D</th>
                <th className="py-1 px-2">A</th>
                <th className="py-1 px-2">Net</th>
                <th className="py-1 px-2">LH</th>
                <th className="py-1 px-2">DN</th>
                <th className="py-1 px-2 ">GPM</th>
                <th className="py-1 px-2">XPM</th>
                <th className="py-1 px-2">DMG</th>
                <th className="py-1 px-2">HEAL</th>
                <th className="py-1 px-2">BLD</th>
                <th className="py-1 px-2">Items</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm divide-y divide-gray-700">
              {details.slice(5, 10).map((player, i) => (
                <MatchDetailsItem key={i} player={player} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
