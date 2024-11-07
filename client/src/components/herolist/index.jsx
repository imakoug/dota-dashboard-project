import { useState } from "react";
import dotaApiService from "../../services/dotaApi";
import Hero from "../hero";

const initialState = {
  steamId: ""
};

function HeroList() {
  const [state, setState] = useState(initialState);
  const [matches, setMatches] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { steamId } = state;
    const res = await dotaApiService.getHeroesPlayed(steamId);

    if (res.error) {
      alert(`${res.message}`);
      setMatches(initialState);
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
          Find heroes played
        </button>
      </form>
      <div className="matches-list">
        {matches !== "" &&
          matches.slice(0,20).map((hero) => (
            <Hero key={hero.hero_id} hero={hero}></Hero>
          ))}
      </div>
    </section>
  );
}


export default HeroList;