import React, { useEffect, useState } from "react";
import userApiService from "../../services/userApi";
import { Link } from "react-router-dom";

const Profile = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const getProfiles = async () => {
      const res = await userApiService.getAll();
      if (res.error) {
        console.log("something went wrong man");
      } else {
        setState(res);
      }
    };
    getProfiles();
  }, []);

  return (
    <div className="profile">
      <h2>Users</h2>
      {state.map((user, i) => (
        <Link key={i} to="/info">
          <div className="profile-info">
            <h3 className="first">{user.username}</h3>
            <h3 className="other">SteamId: {user.steamId}</h3>
            <br></br>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Profile;
