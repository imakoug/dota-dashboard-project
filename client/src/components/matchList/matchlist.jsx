import Match from "../match";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import dotaApiService from "../../services/dotaApi";
import { Link } from "react-router-dom";

function MatchList() {
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    const steamId = user.steamId;
    const getMatches = async (steamId) => {
      const res = await dotaApiService.getRecentMatches(steamId);
      setMatches(res);
    };
    getMatches(steamId);
  }, []);

  return (
    <section className="match-list-section">
      {matches.length < 1 && (
        <h1>Your Steam ID is not valid or your profile is hidden</h1>
      )}
      {matches.length > 1 && (
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
          matches.map((match) => (
            <Link style={{ textDecoration: 'none' }}
              to="/matches/details"
              state={{ id: match.match_id }}
            >
              <Match key={match.match_id} match={match}></Match>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default MatchList;
