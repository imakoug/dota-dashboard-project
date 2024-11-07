import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/AuthApi";
import auth from "../../utils/auth";

const initialState = {
  username: "",
  password: "",
  steamId: "",
  email: "",
  month: "",
  day: "",
  year: "",
};

const Register = (props) => {
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
    const { username, password, steamId, email, month, day, year } = state;
    const birthDate = new Date(year, month - 1, day).toDateString();
    const user = { username, password, birthDate, email, steamId };
    const res = await apiService.register(user);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { token } = res;
      localStorage.setItem('accessToken', token);
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/profile'));
    }
  };

  const validateForm = () => {
    return (
      !state.username ||
      !state.password ||
      !state.email ||
      !state.month ||
      !state.day ||
      !state.year ||
      !state.steamId
    );
  };

  return (
    <section>
      <h2>Register</h2>
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
          <label>Password</label>
        </div>
        <input
          type="password"
          name="password"
          value={state.password}
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
        <div className="layout">
          <label>Date of birth</label>
        </div>
        <div className="bdate-layout">
          <div className="month">
            <div>
              <select name="month" value={state.month} onChange={handleChange}>
                <option value="" disabled="">
                  Month
                </option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>
          <div className="day">
            <div>
              <select name="day" value={state.day} onChange={handleChange}>
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="year">
            <div>
              <select name="year" value={state.year} onChange={handleChange}>
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = 2024 - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="layout">
          <label>Email</label>
        </div>
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
    </section>
  );
};

export default Register;
