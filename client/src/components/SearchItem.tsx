import React, { useState } from "react";
import { IUser } from "../screens/FriendsPage";
import toast from "react-hot-toast";

interface ISearchProps {
  user: IUser;
}

export default function SearchItem({
  user,
  setId,
  fetchUserData,
  steamId,
}: any) {
  const [sent, setSent] = useState<boolean>(false);

  const sendFriendRequest = async (friendId: string) => {
    try {
      const response = await fetch("http://localhost:3000/friend/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          steamId: steamId,
          friendSteamId: friendId,
        }),
      }).then((res) => res.json());
      if (response.error) {
        toast.error(response.message);
        console.log(response);
      } else {
        toast(
          `Friend request sent to user with Email: ${response.friendEmail}`
        );
      }
      fetchUserData();
      // setId("");
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-700 transition rounded-lg flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-200">
          Dota ID: {user.steamId}
        </h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
      <button
        className={`px-4 py-2 bg-blue-600 ${!sent && "hover:bg-blue-700"} text-white rounded-md`}
        disabled={sent}
        onClick={() => {
          sendFriendRequest(user.steamId);
          setSent(true);
        }}
      >
        {sent ? "Request sent" : "Add Friend"}
      </button>
    </div>
  );
}
