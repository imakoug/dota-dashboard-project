import React, { useState } from "react";
import userApiService from "../services/UserApi";
import { useNavigate } from "react-router-dom";

interface IUser {
  username: string;
  steamId: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    username: "",
    steamId: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    var numberRegex = /^\d+$/;
    if (!numberRegex.test(user.steamId)) {
      alert("SteamId should include only numbers");
    } else {
      const res = await userApiService.create!(user);
      alert(`${res.message}`);
      setUser({
        username: "",
        steamId: "",
      });
      navigate("/profile");
    }
  };

  const validateForm = () => {
    return !user.username || !user.steamId;
  };

  return (
    <section>
      <h2>Create a user</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="layout">
          <label>Username</label>
        </div>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <div className="layout">
          <label>SteamId</label>
        </div>
        <input
          type="steamId"
          name="steamId"
          value={user.steamId}
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
