import dotaApiService from "../../services/dotaApi";
import { useEffect, useState } from "react";

function Match ({ match }) {

  const [details, setDetails] = useState({});
  const matchId = match.match_id;

  useEffect(() => {
    const getProfile = async () => {
      let res = await dotaApiService.getMatch(matchId);
      for (let player of res.players) {
        if (player.hero_id === match.hero_id) {
          setDetails(player);
        }
      }
    };
    getProfile();
  }, [matchId]);

  return (
    <table>
      <tbody>
        <tr>
          <td>{match.match_id}</td>
          <td>3434</td>
          <td>
            K/D/A - {match.kills}/{match.deaths}/{match.assists}
          </td>
          <td>{details.account_id}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Match;
