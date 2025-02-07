import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/Backbutton";
import liquiApiService from "../services/LiquiApi";

const roleOrder: any = {
  Carry: 1,
  "Solo Middle": 2,
  Offlaner: 3,
  Support: 4,
  Coach: 5,
  Manager: 6,
};

function TeamDetails() {
  const [players, setPlayers] = useState<any>([]);
  const location = useLocation();
  const team = location.state?.team;

  useEffect(() => {
    (async () => {
      const res = await liquiApiService.getActiveTeamPlayers!(team.pagename);
      setPlayers(
        res.sort(
          (a: any, b: any) =>
            roleOrder[a.extradata.role] - roleOrder[b.extradata.role]
        )
      );
    })();
  }, []);

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h1 className="text-2xl font-bold mb-4">Active Roster</h1>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    {players.length > 0 ? (
                      <tr>
                        <th className="py-3 px-4 text-left font-semibold text-white">
                          Nickname
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-white">
                          Role
                        </th>
                      </tr>
                    ) : (
                      <tr>
                        <td className="py-6 px-4 text-center text-lg font-semibold text-gray-300">
                          No players available
                        </td>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {players.length > 0 &&
                      players.map((player: any) => {
                        return (
                          player.extradata.role != "Manager" && (
                            <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                              <td className="py-3 px-4">{player.id}</td>
                              <td
                                className={`py-3 px-4 ${
                                  player.extradata.role == "Coach"
                                    ? "text-yellow-300"
                                    : ""
                                }`}
                              >
                                {player.extradata.role ||
                                  player.extradata.role2}
                              </td>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="md:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={`/teams/${team.pagename}.png`}
                  className="w-32 h-32 object-contain mb-4"
                  alt={team.name}
                />
                <h1 className="text-2xl font-bold text-center mb-2">
                  {team.name}
                </h1>
              </div>

              <div className="space-y-4">
                <div className="pb-2 border-b border-gray-700">
                  <dt className="text-sm font-semibold text-gray-400">
                    Location
                  </dt>
                  <dd className="mt-1">{team.locations.region1 || "N/A"}</dd>
                </div>

                <div className="pb-2 border-b border-gray-700">
                  <dt className="text-sm font-semibold text-gray-400">
                    Region
                  </dt>
                  <dd className="mt-1">{team.region || "N/A"}</dd>
                </div>
                {players.length > 0 &&
                  players.some(
                    (player: any) => player.extradata?.role === "Manager"
                  ) && (
                    <div className="pb-2 border-b border-gray-700">
                      <dt className="text-sm font-semibold text-gray-400">
                        Manager
                      </dt>
                      <dd className="mt-1">{players[players.length - 1].id}</dd>
                    </div>
                  )}

                <div className="pb-2 border-b border-gray-700">
                  <dt className="text-sm font-semibold text-gray-400">
                    Total Winnings
                  </dt>
                  <dd className="mt-1">{team.earnings}$</dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-gray-400">
                    Founded
                  </dt>
                  <dd className="mt-1">{team.createdate}</dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamDetails;
