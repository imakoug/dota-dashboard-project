import dotaApiService from "../../services/dotaApi";
import { useEffect, useState } from "react";
import heroimg from "../../heroimg";
import getRankTier from "../../utils/rankTier";
// import items from "../../items";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function Match({ match }) {
  const [details, setDetails] = useState({});
  const [hero, setHero] = useState("");
  const [img, setImg] = useState("");
  // const [it, setIt] = useState([]);
  const matchId = match.match_id;
  let result;

  useEffect(() => {
    const getProfile = async () => {
      let res = await dotaApiService.getMatch(matchId);
      if (res.error) {
      } else {
        for await (let player of res.players) {
          if (player.hero_id === match.hero_id) {
            setDetails(player);
          }
        }
        for await (let hero of heroimg) {
          if (hero.id === match.hero_id) {
            setHero(hero.localized_name);
          }
          if (hero.id === match.hero_id) setImg(hero.imgpath);
        }
        // for (let item of items) {
        //   if (item.id === details.item_0) {
        //     setIt((prevState) => [
        //       ...prevState,
        //       item.url_image
        //     ])
        //   } else if (item.id === details.item_1) {
        //     setIt((prevState) => [
        //       ...prevState,
        //       item.url_image
        //     ])
        //   }
        //   else if (item.id === details.item_2) {
        //     setIt((prevState) => [
        //       ...prevState,
        //       item.url_image
        //     ])
        //   }
        //   else if (item.id === details.item_3) {
        //     setIt((prevState) => [
        //       ...prevState,
        //       item.url_image
        //     ])
        //   }
        //   else if (item.id === details.item_4) {
        //     setIt((prevState) => [
        //       ...prevState,
        //       item.url_image
        //     ])
        //   }
        //   else if (item.id === details.item_5) {
        //     setIt((prevState) => [
        //       ...prevState,
        //       item.url_image
        //     ])
        //   }
        // }
      }
    };
    getProfile();
  }, [matchId, hero]);

  result =
    (details.isRadiant && details.radiant_win) ||
    (!details.isRadiant && !details.radiant_win)
      ? "Won"
      : "Lost";

  return (
    <div className="match-row">
      <div className="match-hero">
        <img src={img} alt={hero} className="hero-image" />
        <div className="hero-info">
          <div className="hero-name">{hero}</div>
          <div className="hero-rank">{getRankTier(details.rank_tier)}</div>
        </div>
      </div>
      <div className="winrate"></div>
      <div className={`match-result ${result}`}>{result} Match</div>
      <div className="match-type">
        {match.game_mode === 22 ? "Ranked" : "Single Draft"}
      </div>
      <div className="winrate"></div>
      <div className="match-duration">{formatTime(details.duration)}</div>
      <div className="match-kda">
        {details.kills}/{details.deaths}/{details.assists}
        <div className="kda-bar">
          <div
            className="kda-bar-segment kills"
            style={{
              width: `${
                (details.kills /
                  (details.kills + details.deaths + details.assists)) *
                100
              }%`,
            }}
          ></div>
          <div
            className="kda-bar-segment deaths"
            style={{
              width: `${
                (details.deaths /
                  (details.kills + details.deaths + details.assists)) *
                100
              }%`,
            }}
          ></div>
          <div
            className="kda-bar-segment assists"
            style={{
              width: `${
                (details.assists /
                  (details.kills + details.deaths + details.assists)) *
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
