import Match from "../match";
import { useState } from "react";
import dotaApiService from "../../services/dotaApi";
import {isNil} from 'lodash';

const initialState = {
  steamId: "",
};

function MatchList() {
  const [state, setState] = useState(initialState);
  const [matches, setMatches] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { steamId } = state;
    const res = await dotaApiService.getRecentMatches(steamId);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      setMatches(res);
    }
  };

  const validateForm = () => {
    return !state.steamId;
  };

  return (
    <section className="match-list-section">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Your Steam ID</label>
          <input
            type="text"
            name="steamId"
            value={state.steamId}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Steam ID"
          />
        </div>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          Find recent matches
        </button>
      </form>
      {!isNil(matches[0]) && (
        <tr className="info">
          <th>Hero</th>
          <th>Result</th>
          <th>Type</th>
          <th>Duration</th>
          <th>KDA</th>
        </tr>
      )}
      <div className="matches-list">
        {matches !== "" &&
          matches.map((match) => (
            <Match key={match.match_id} match={match}></Match>
          ))}
      </div>
    </section>
  );
}

export default MatchList;
