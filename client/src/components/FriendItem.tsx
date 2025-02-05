import React, { useState, useEffect } from "react";
import dotaApiService from "../services/DotaApi";

interface IFItemProps {
  steamId: string;
}

function FriendItem({ steamId }: IFItemProps) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    dotaApiService.getUserInfo!(steamId).then((res) => setUserData(res));
  }, [steamId]);

  return (
    <div className="flex items-center space-x-4">
      <img
        src={userData?.profile?.avatarmedium}
        alt="Profile Avatar"
        className="w-12 h-12 rounded-full"
      />
      <div className="text-lg font-medium text-gray-100">
        {userData?.profile?.personaname}
      </div>
    </div>
  );
}

export default FriendItem;