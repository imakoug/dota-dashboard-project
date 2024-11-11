import React, { useState } from "react";
import userApiService from "../../services/userApi";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  steamId: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedToInt  = parseInt(state.steamId, 10);
    if (!parsedToInt) {
      alert("steamId should be a number")
    } else {
      const res = await userApiService.create(state);
      alert(`${res.message}`);
      setState(initialState);
      navigate("/profile");
    }
  };

  const validateForm = () => {
    return !state.username || !state.steamId;
  };

  return (
    <section>
      <h2>Creater a user</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="layout">
          <label>Username</label>
        </div>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <div className="layout">
          <label>SteamId</label>
        </div>
        <input
          type="steamId"
          name="steamId"
          value={state.steamId}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Add user&nbsp;
        </button>
      </form>
    </section>
  );
};

export default Register;
