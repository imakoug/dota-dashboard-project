import React, { useEffect, useState } from "react";
import { IProfile } from "../types";
import userApiService from "../services/UserApi";
import dotaApiService from "../services/DotaApi";
import getRankImage from "../utils/rankImages";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface IProfileProps {
  user: IProfile;
  setProfiles: (profiles: IProfile[]) => void;
  profiles: IProfile[];
}

const Profile = ({ user, setProfiles, profiles }: IProfileProps) => {
  const [rankImg, setRankImg] = useState<string>("");
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await dotaApiService.getUserInfo!(user.steamId);

      setUserData(res);
      setRankImg(getRankImage(res.rank_tier));
    };
    getUser();
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
        setProfiles(
          profiles.filter((user: IProfile) => user.steamId !== steamId)
        );
        toast.success("User succesfully deleted!");
      }
    } catch (e) {
      console.log(e);
      alert("An error occurred");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-4 flex flex-col md:flex-row items-center md:items-start">
      <div className="flex flex-col items-center space-y-4 md:mr-6">
        <a href={userData.profile?.profileurl} target="_blank" rel="noreferrer">
          <img
            src={
              userData.profile?.avatarfull ||
              "https://www.augenarzt-karlsruhe.com/wp-content/uploads/2023/10/no-avatar.jpg"
            }
            alt="Avatar"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg transition-transform hover:scale-110 duration-300"
          />
        </a>
        <img
          src={
            rankImg ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
          }
          alt="Rank"
          className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-gray-600"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        {!userData.error && userData.length !== 0 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">
              {userData.profile.personaname}
            </h2>
          </>
        )}
        {userData.error && (
          <h2 className="text-red-500 text-lg font-semibold">
            {userData.error}
          </h2>
        )}
        <h3 className="text-xl font-semibold text-white mb-2">
          {user.username}
        </h3>
        <h3 className="text-gray-400 mb-4">SteamId: {user.steamId}</h3>
        <div className="flex justify-center md:justify-start space-x-4 mb-4">
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
    </div>
  );
};

export default Profile;
