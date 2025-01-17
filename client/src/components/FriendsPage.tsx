import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const socket = io("http://localhost:4000");

function FriendsPage() {
  const { authState, onProfile } = useAuth();
  const [user, setUser] = useState<any>(null);

  const fetchUserData = async () => {
    try {
      const data = await onProfile!(authState!.token as string);
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [authState]);

  const deleteFriend = async (friendId: string) => {
    try {
      const res = await fetch("http://localhost:3000/friend/delete", {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          steamId: user.steamId,
          friendSteamId: friendId,
        }),
      });
      fetchUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const sendFriendRequest = async (friendId: string) => {
    try {
      const response = await fetch("http://localhost:3000/friend/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          steamId: user.steamId,
          friendSteamId: friendId,
        }),
      });
      toast(`Friend request sent to user with ID: ${friendId}`);
      fetchUserData();
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const acceptFriendRequest = async (friendId: string) => {
    try {
      const response = await fetch("http://localhost:3000/friend/accept", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          steamId: user.steamId,
          friendSteamId: friendId,
        }),
      });
      fetchUserData();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("userConnected", user.steamId);

    const handleNewFriendRequest = (data: {
      from: string;
      message: string;
    }) => {
      toast(data.message);
      fetchUserData();
    };

    const handleFriendAdded = (data: { friendId: string; email: string }) => {
      toast.success(`You are now friends with ${data.email}!`);
      fetchUserData();
    };

    const handleFriendDeleted = (data: { friendId: string; email: string }) => {
      toast.error(`you are no more friends with ${data.email}`);
      fetchUserData();
    };

    socket.on("newFriendRequest", handleNewFriendRequest);
    socket.on("friendAdded", handleFriendAdded);
    socket.on("friendDeleted", handleFriendDeleted);

    return () => {
      socket.off("newFriendRequest", handleNewFriendRequest);
      socket.off("friendAdded", handleFriendAdded);
      socket.off("friendDeleted", handleFriendDeleted);
    };
  }, [user]);

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Friends Page</h1>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Your Friends</h2>
          <ul className="bg-gray-800 p-4 rounded-lg space-y-2">
            {user &&
              user.friends.map((friend: any, i: number) => (
                <div key={i}>
                  <li className="p-2 bg-gray-700 rounded-md flex justify-between">
                    <span>{friend}</span>
                  </li>
                  <button onClick={() => deleteFriend(friend)}>
                    Delete friend
                  </button>
                </div>
              ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Pending Friend Requests</h2>
          <ul className="bg-gray-800 p-4 rounded-lg space-y-2">
            {user &&
              user.pendingRequests.map((steamId: any, i: number) => (
                <li
                  key={i}
                  className="p-2 bg-gray-700 rounded-md flex justify-between"
                >
                  <span>{steamId}</span>
                  <button
                    onClick={() => acceptFriendRequest(steamId)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    Accept
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Sent requests</h2>
          <ul className="bg-gray-800 p-4 rounded-lg space-y-2">
            {user &&
              user.sentRequests.map((req: any, i: number) => (
                <li key={i} className="p-2 bg-gray-700 rounded-md text-sm">
                  {req}
                </li>
              ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Add a Friend</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const friendId = (e.target as any).friendId.value.trim();
              sendFriendRequest(friendId);
            }}
            className="bg-gray-800 p-4 rounded-lg flex space-x-4"
          >
            <input
              type="text"
              name="friendId"
              placeholder="Enter user ID"
              className="flex-grow p-2 bg-gray-700 text-white rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FriendsPage;
