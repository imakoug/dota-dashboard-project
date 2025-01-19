import React, { useState, useEffect } from "react";
import dotaApiService from "../services/DotaApi";
import { IProfile } from "../types";

interface IFItemProps {
  steamId: string;
}

function FriendItem({ steamId }: IFItemProps) {
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    dotaApiService.getUserInfo!(steamId).then((res) => setUserData(res));
  }, []);

  return (
    <div>
      <img src={userData?.profile?.avatarmedium}></img>
      <div>{userData?.profile?.personaname}</div>
    </div>
  );
}

export default FriendItem;
