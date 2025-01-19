import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import FriendItem from "./FriendItem";

const socket = io("http://localhost:4000");

function FriendsPage() {
  const { authState, onProfile } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [id, setId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const data = await onProfile!(authState!.token as string);
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const confirmDeleteFriend = (friendId: string) => {
    setShowDeleteModal(true);
    setFriendToDelete(friendId);
  };

  useEffect(() => {
    fetchUserData();
  }, [authState]);

  const deleteFriend = async () => {
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
          friendSteamId: friendToDelete,
        }),
      });
      fetchUserData();
      setShowDeleteModal(false);
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
      }).then((res) => res.json());
      if (response.error) {
        toast.error(response.message);
      } else {
        toast(`Friend request sent to user with Email: ${response.friendEmail}`);
      }
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendFriendRequest(id);
    setId("");
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setId(value);
  };

  const validate = () => {
    return !id;
  };

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Friends</h1>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Friends List</h2>
          <ul className="bg-gray-800 p-4 rounded-lg space-y-2">
            {user &&
              user.friends.map((friend: any, i: number) => (
                <div key={i}>
                  <li className="p-2 bg-gray-700 rounded-md flex justify-between items-center">
                    <FriendItem steamId={friend} />
                    <button
                      onClick={() => confirmDeleteFriend(friend)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete Friend
                    </button>
                  </li>
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
                  <FriendItem steamId={steamId}></FriendItem>
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
                  <FriendItem steamId={req}></FriendItem>
                </li>
              ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Add a Friend</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-4 rounded-lg flex space-x-4"
          >
            <input
              type="text"
              name="friendId"
              value={id}
              onChange={handleChange}
              placeholder="Enter user ID"
              className="flex-grow p-2 bg-gray-700 text-white rounded-md"
            />
            <button
              type="submit"
              className={`px-4 py-2  text-white rounded-md transition ${
                !validate() ? "bg-blue-600" : "cursor-not-allowed bg-gray-600"
              }`}
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this friend? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteFriend}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FriendsPage;
