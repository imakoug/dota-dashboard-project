import Match from "./Match";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import dotaApiService from "../services/DotaApi";
import { Link } from "react-router-dom";
import { IMatch } from "../types";

function MatchList() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    const steamId = user.steamId;
    const getMatches = async (steamId: string) => {
      const res = await dotaApiService.getRecentMatches!(steamId);
      setMatches(res);
      console.log(res);
    };
    getMatches(steamId);
  }, []);

  return (
    <section className="match-list-section">
      {matches.length < 1 && (
        <h1>Your Steam ID is not valid or your profile is hidden</h1>
      )}
      {matches.length > 1 && (
        // make it with <table>
        <tr className="info">
          <th>Hero</th>
          <th>Result</th>
          <th>Type</th>
          <th>Duration</th>
          <th>KDA</th>
        </tr>
      )}
      <div className="matches-list">
        {matches.length > 1 &&
          matches.map((match: IMatch, i: number) => (
            <Link
              key={i}
              style={{ textDecoration: "none" }}
              to="/matches/details"
              state={{ id: match.match_id }}
            >
              <Match match={match}></Match>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default MatchList;
