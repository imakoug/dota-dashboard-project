import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/Backbutton";
import liquiApiService from "../services/LiquiApi";
import TeamItem from "../components/TeamItem";

function Teams() {
  const [teams, setTeams] = useState<any>([]);
  const [filteredTeams, setFilteredTeams] = useState<any>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  useEffect(() => {
    (async () => {
      const res = await liquiApiService.getActiveTeams!();
      setTeams(res.toSorted((a: any, b: any) => b.earnings - a.earnings));
      setFilteredTeams(res);

      const uniqueRegions: Set<string> = new Set(
        res.map((team: any) => (team.region ? team.region : "N/A"))
      );
      setRegions(["All", ...uniqueRegions]);
    })();
  }, []);

  useEffect(() => {
    if (selectedRegion === "All") {
      setFilteredTeams(teams);
    } else {
      const filtered = teams.filter(
        (team: any) =>
          team.region === (selectedRegion === "N/A" ? "" : selectedRegion)
      );
      setFilteredTeams(filtered);
    }
  }, [selectedRegion, teams]);

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-400 mb-6 text-center">
        Teams
      </h1>
      <div className="flex justify-end mb-8">
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {regions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team: any, i: number) => (
            <Link to={`/news/teams/${team.pagename}`} state={{ team }} key={i}>
              <TeamItem team={team} />
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No teams found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Teams;
