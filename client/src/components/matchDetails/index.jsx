import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import dotaApiService from "../../services/dotaApi";
import MatchDetailsItem from "../matchDetailsItem";
import "./style.css";

const MatchDetails = () => {
  const [details, setDetails] = useState([]);
  const [score, setScore] = useState([]);
  const [res, setRes] = useState(false);
  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    dotaApiService.getMatch(id).then((res) => {
      setDetails(res.players);
      setScore([res.radiant_score, res.dire_score]);
      setRes(res.players[0].radiant_win);
    });
  }, [id]);

  const clasers = res ? "rad" : "dir";

  return (
    <div>
      <h1 className="score">
        {score[0]} - {score[1]}
      </h1>
      <h1 className={clasers}>
        {res ? "RADIANT VICTORY" : "DIRE VICTORY"}
      </h1>

      <div>
        <h2 id="radiant">The Radiant</h2>
        <table>
          <thead>
            <tr>
              <th>Hero</th>
              <th>Player</th>
              <th>K</th>
              <th>D</th>
              <th>A</th>
              <th>Net Worth</th>
              <th>LH</th>
              <th>DN</th>
              <th>GPM</th>
              <th>XPM</th>
              <th>DMG</th>
              <th>HEAL</th>
              <th>BLD</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {details.slice(0, 5).map((player, i) => (
              <MatchDetailsItem key={i} player={player} />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 id="dire">The Dire</h2>
        <table>
          <thead>
            <tr>
              <th>Hero</th>
              <th>Player</th>
              <th>K</th>
              <th>D</th>
              <th>A</th>
              <th>Net Worth</th>
              <th>LH</th>
              <th>DN</th>
              <th>GPM</th>
              <th>XPM</th>
              <th>DMG</th>
              <th>HEAL</th>
              <th>BLD</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {details.slice(5, 10).map((player, i) => (
              <MatchDetailsItem key={i} player={player} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchDetails;
