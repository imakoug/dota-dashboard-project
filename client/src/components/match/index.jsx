import { useEffect } from "react";

function Match ({ match }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>{match.match_id}</td>
          <td>{match.game_mode === 22 ? "ranked" : "sd"}</td>
          <td>
            K/D/A - {match.kills}/{match.assists}/{match.deaths}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Match;
