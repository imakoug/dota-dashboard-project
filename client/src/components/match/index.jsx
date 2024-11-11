import { useEffect, useState } from "react";
import heroimg from "../../heroimg";
import getRankTier from "../../utils/rankTier";
import getGameMode from "../../utils/gameMode";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function Match({ match }) {
  const [hero, setHero] = useState("");
  const [img, setImg] = useState("");
  let result;

  useEffect(() => {
    for (let hero of heroimg) {
      if (hero.id === match.hero_id) {
        setHero(hero.localized_name);
        setImg(hero.imgpath);
      }
    }
  }, []);

  result =
    (match.player_slot <= 127 && match.radiant_win) ||
    (match.player_slot <= 255 && match.player_slot >= 128 && !match.radiant_win)
      ? "Won"
      : "Lost";

  return (
    <div className="match-row">
      <div className="match-hero">
        <img src={img} alt={hero} className="hero-image" />
        <div className="hero-info">
          <div className="hero-name">{hero}</div>
          <div className="hero-rank">{getRankTier(match.average_rank)}</div>
        </div>
      </div>
      <div className="winrate"></div>
      <div className={`match-result ${result}`}>{result} Match</div>
      <div className="match-type">
        {getGameMode(match.game_mode)}
      </div>
      <div className="winrate"></div>
      <div className="match-duration">{formatTime(match.duration)}</div>
      <div className="match-kda">
        {match.kills}/{match.deaths}/{match.assists}
        <div className="kda-bar">
          <div
            className="kda-bar-segment kills"
            style={{
              width: `${
                (match.kills /
                  (match.kills + match.deaths + match.assists)) *
                100
              }%`,
            }}
          ></div>
          <div
            className="kda-bar-segment deaths"
            style={{
              width: `${
                (match.deaths /
                  (match.kills + match.deaths + match.assists)) *
                100
              }%`,
            }}
          ></div>
          <div
            className="kda-bar-segment assists"
            style={{
              width: `${
                (match.assists /
                  (match.kills + match.deaths + match.assists)) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Match;
