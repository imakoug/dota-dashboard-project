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

  const handleClick = async (steamId) => {
    const req = { steamId: steamId };
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      const res = await userApiService.deleteOne(req);
      if (res.error) {
        alert(`${res.message}`);
      } else {
        setState((prevState) =>
          prevState.filter((user) => user.steamId !== steamId)
        );
        alert(`${res.message}`);
      }
    } catch (e) {
      console.log(e);
      alert("An error occurred");
    }
  };

  return (
    <div className="profile">
      <h2>Users</h2>
      {state.length === 0 && <h1>There are no users</h1>}
      {state.map((user, i) => (
        <div key={i} className="profile-info">
          <h3>{user.username}</h3>
          <h3>SteamId: {user.steamId}</h3>
          <Link to="/heroes" state={{ user }}>
            Get Heroes
          </Link>
          <Link to="/matches" state={{ user }}>
            Get Matches
          </Link>
          <Link onClick={() => handleClick(user.steamId)}>Delete User</Link>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Profile;
