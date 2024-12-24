import React, { useEffect, useState } from "react";
import userApiService from "../services/UserApi";
import { IProfile } from "../types";
import Profile from "./Profile";

const ProfileList = () => {
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



  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Users
        </h2>
        {profiles.length === 0 && (
          <h1 className="text-lg text-gray-300">There are no users</h1>
        )}
        {profiles.map((user: IProfile, i: number) => (
            <Profile key={i} user={user} setProfiles={setProfiles} profiles={profiles}></Profile>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
