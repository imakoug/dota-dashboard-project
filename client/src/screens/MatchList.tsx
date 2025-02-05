import Match from "../components/Match";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dotaApiService from "../services/DotaApi";
import { IMatch } from "../types";
import BackButton from "../components/Backbutton";

function MatchList() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  useEffect(() => {
    const steamId = user.steamId;
    const getMatches = async (steamId: string) => {
      const res = await dotaApiService.getRecentMatches!(steamId);
      setMatches(res);
    };
    getMatches(steamId);
  }, []);

  if (matches.length < 1) {
    return (
      <section className="bg-gray-900 text-gray-100 min-h-screen p-8">
        <h1 className="text-2xl text-center font-semibold text-gray-700">
          Loading...
        </h1>
      </section>
    );
  }

  return (
    <section className="p-6 bg-gray-900 ">
      <BackButton></BackButton>
      <h2 className="text-3xl font-bold text-gray-400 mb-6 text-center">
        Recent Matches
      </h2>
      <table className="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Hero</th>
            <th className="py-3 px-6 text-left">Result</th>
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-left">Duration</th>
            <th className="py-3 px-6 text-left">KDA</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-sm font-light">
          {matches.map((match: IMatch, i: number) => (
            <Match key={i} match={match} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default MatchList;
