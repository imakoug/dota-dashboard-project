import React, { useEffect, useState } from "react";
import heroimg from "../utils/heroimg";
import getRankTier from "../utils/rankTier";
import getGameMode from "../utils/gameMode";
import { IMatch } from "../types";
import { useNavigate } from "react-router-dom";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

interface IMatchProps {
  match: IMatch;
}

const Match = ({ match }: IMatchProps) => {
  const [hero, setHero] = useState("");
  const [img, setImg] = useState("");
  let result;
  const navigate = useNavigate();

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
    <tr
      className=" hover:bg-gray-700 cursor-pointer"
      onClick={() =>
        navigate(`/matches/details`, { state: { id: match.match_id } })
      }
    >
      <td className="py-3 px-6 flex items-center">
        <img src={img} alt={hero} className="w-30 h-20 mr-4" />
        <div>
          <div className="font-medium">{hero}</div>
          <div className="text-xs text-gray-500">
            {getRankTier(match.average_rank)}
          </div>
        </div>
      </td>
      <td
        className={`py-3 px-6 ${
          result === "Won" ? "text-green-600" : "text-red-600"
        }`}
      >
        {result} Match
      </td>
      <td className="py-3 px-6">{getGameMode(match.game_mode)}</td>
      <td className="py-3 px-6">{formatTime(match.duration)}</td>
      <td className="py-3 px-6">
        <div>
          <span className="font-semibold">
            {match.kills}/{match.deaths}/{match.assists}
          </span>
          <div className="flex items-center gap-1 mt-1">
            <div
              className="h-2 bg-green-400"
              style={{
                width: `${
                  (match.kills / (match.kills + match.deaths + match.assists)) *
                  100
                }%`,
              }}
            ></div>
            <div
              className="h-2 bg-gray-400"
              style={{
                width: `${
                  (match.deaths /
                    (match.kills + match.deaths + match.assists)) *
                  100
                }%`,
              }}
            ></div>
            <div
              className="h-2 bg-red-400"
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
      </td>
    </tr>
  );
};

export default Match;
