import React, { useEffect, useState } from "react";
import apiService from "../../services/AuthApi";
const initialState = {
  username: "",
  email: "",
  steamId: ""
};

const Profile = ({ onSendData }) => {
  const [state, setState] = useState(initialState);

  const username = state.username || "daun";
  const email = state.email || "debil@email.com";
  const steamId = state.steamId || 232323;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const getProfile = async (accessToken) => {
      const userInfo = await apiService.profile(accessToken);
      if (userInfo) {
        const { username, email, steamId} = userInfo;
        onSendData(steamId)
        setState((prevState) => {
          return {
            ...prevState,
            username,
            email,
            steamId
          };
        });
      } else {
        console.log("No info found");
      }
    };
    getProfile(accessToken);
  }, []);

  return (
    <div className="profile">
      <h2>My Profile</h2>
      <div className="profile-info">
        <h3 className="first">Welcome, Mr. {username}!</h3>
        <h3 className="other">SteamId: {steamId}</h3>
        <h3 className="other">Email: {email}</h3>
      </div>
    </div>
  );
};

export default Profile;
