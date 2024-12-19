import React, { useEffect, useState } from "react";
import userApiService from "../services/UserApi";
import { Link } from "react-router-dom";
import { IProfile } from "../types";

const Profile = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    const getProfiles = async () => {
      const res = await userApiService.getAll!();
      if (res.e) {
        console.log(res.e);
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
      }
    } catch (e) {
      console.log(e);
      alert("An error occurred");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Users</h2>
        {profiles.length === 0 && (
          <h1 className="text-lg text-gray-300">There are no users</h1>
        )}
        {profiles.map((user: IProfile, i: number) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-lg shadow-md mb-4 text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {user.username}
            </h3>
            <h3 className="text-gray-400 mb-4">SteamId: {user.steamId}</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <Link
                to="/heroes"
                state={{ user }}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
              >
                Get Heroes
              </Link>
              <Link
                to="/matches"
                state={{ user }}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
              >
                Get Matches
              </Link>
            </div>
            <button
              onClick={() => handleClick(user.steamId)}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300"
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
