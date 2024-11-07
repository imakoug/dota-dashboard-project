import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/AuthApi";
import auth from "../../utils/auth";

const initialState = {
  username: "",
  password: "",
};

const Login = (props) => {
  let navigate = useNavigate();
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
    const { username, password } = state;
    const user = { username, password };
    const res = await apiService.login(user);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { token } = res;
      localStorage.setItem('accessToken', token);
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/profile'));
    }
    // REMOVE-END
  };

  const validateForm = () => {
    return !state.username || !state.password;
  };

  return (
    <section>
      <h2>Login</h2>
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
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </section>
  );
};

export default Login;
