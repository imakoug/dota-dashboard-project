import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import dotaApiService from "../services/DotaApi";
import getRankImage from "../utils/rankImages";
import { Link } from "react-router-dom";
import { IProfile } from "../types";

const NO_AVATAR_URL =
  "https://www.augenarzt-karlsruhe.com/wp-content/uploads/2023/10/no-avatar.jpg";
const NO_RANK_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

const Profile = () => {
  const [rankImg, setRankImg] = useState<string>(NO_RANK_IMAGE_URL);
  const [userData, setUserData] = useState<any>(null);
  const [user, setUser] = useState<IProfile>({
    password: "",
    steamId: "",
    email: "",
    __v: 0,
    _id: "",
  });
  const { authState, onProfile } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = authState?.token;
        const profik = await onProfile!(token as string);
        setUser(profik.user);
        const res = await dotaApiService.getUserInfo!(profik.user.steamId);
        setUserData(res);
        setRankImg(getRankImage(res.rank_tier));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [authState, onProfile]);

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <header className="w-full max-w-4xl flex flex-col items-center space-y-4 mb-10">
        <div className="relative">
          <img
            src={userData?.profile?.avatarfull || NO_AVATAR_URL}
            alt="User Avatar"
            className="w-32 h-32 rounded-full shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2">
            <img
              src={rankImg}
              alt="Rank"
              className="w-12 h-12 rounded-full border-2 border-gray-700"
              title="User Rank"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold">
          {userData?.profile?.personaname || "Unknown User"}
        </h1>
        <h2 className="text-lg text-gray-400">
          Dota ID: {user.steamId || "Not available"}
        </h2>
      </header>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Profile Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Email</span>
            <span className="text-lg font-medium">{user.email || "-"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Dota ID</span>
            <span className="text-lg font-medium">
              {user.steamId || "Not available"}
            </span>
          </div>
          <div className="flex flex-col sm:col-span-2">
            <span className="text-gray-400 text-sm">Steam Profile Link</span>
            <a
              href={userData?.profile?.profileurl || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              {userData?.profile?.profileurl || "No link available"}
            </a>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
          <Link
            to="/heroes"
            state={{ user }}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-200"
          >
            Get Heroes
          </Link>
          <Link
            to="/matches"
            state={{ user }}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-200"
          >
            Get Matches
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
