import React, { useEffect, useState } from "react";
import userApiService from "../services/UserApi";
import { Link } from "react-router-dom";
import { IProfile } from "../types";

const Profile = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    const getProfiles = async () => {
      const res = await userApiService.getAll!();
      if (res.error) {
        console.log("something went wrong man");
      } else {
        setProfiles(res);
      }
    };
    getProfiles();
  }, []);

  const handleClick = async (steamId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      const res = await userApiService.deleteOne!(steamId);
      if (res.error) {
        alert(`${res.message}`);
      } else {
        setProfiles((prevState: IProfile[]) =>
          prevState.filter((user: IProfile) => user.steamId !== steamId)
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
      {profiles.length === 0 && <h1>There are no users</h1>}
      {profiles.map((user: IProfile, i: number) => (
        <div key={i} className="profile-info">
          <h3>{user.username}</h3>
          <h3>SteamId: {user.steamId}</h3>
          <Link to="/heroes" state={{ user }}>
            Get Heroes
          </Link>
          <Link to="/matches" state={{ user }}>
            Get Matches
          </Link>
          <a onClick={() => handleClick(user.steamId)}>Delete User</a>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Profile;
