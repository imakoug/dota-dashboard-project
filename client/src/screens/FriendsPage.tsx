import React, { useState, useEffect } from "react";
import userApiService from "../services/UserApi";
import SearchItem from "../components/SearchItem";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import FriendItem from "../components/FriendItem";

export interface IUser {
  email: string;
  friends: string[];
  password: string;
  pendingRequests: string[];
  sentRequests: string[];
  steamId: string;
  __v: number;
  _id: string;
}
const socket = io("http://localhost:4000");

function FriendsPage() {
  const { authState, onProfile } = useAuth();
  const [user, setUser] = useState<IUser>({
    email: "",
    friends: [],
    password: "",
    pendingRequests: [],
    sentRequests: [],
    steamId: "",
    __v: 0,
    _id: "",
  });
  const [id, setId] = useState<string>("");
  const [users, setUsers] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const data = await onProfile!(authState!.token as string);
      const dat = await userApiService.getUsers!();
      setUsers(dat.users);
      setUser(data.user);
    } catch (error) {
      return null;
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
    setId("");
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setId(value);
    let temp = users.filter(
      (it: any) =>
        it.steamId.includes(value) &&
        it.steamId !== user.steamId &&
        !it.friends.includes(user.steamId) &&
        !it.pendingRequests.includes(user.steamId) &&
        !it.sentRequests.includes(user.steamId)
    );
    setSearch(temp);
  };

  const validate = () => {
    return !id;
  };

  return (
  <section className="bg-gray-900 text-gray-100 min-h-screen p-6">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Friends</h1>

    {/* Friends List */}
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Friends List</h2>
      <ul className="bg-gray-800 p-4 rounded-lg space-y-2">
        {user.friends.length ? (
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
          ))
        ) : (
          <h1>You don't have any friends yet</h1>
        )}
      </ul>
    </div>

    {/* Pending Friend Requests */}
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Pending Friend Requests</h2>
      <ul className="bg-gray-800 p-4 rounded-lg space-y-2">
        {user.pendingRequests.length ? (
          user.pendingRequests.map((steamId: any, i: number) => (
            <li
              key={i}
              className="p-2 bg-gray-700 rounded-md flex justify-between items-center"
            >
              <FriendItem steamId={steamId} />
              <button
                onClick={() => acceptFriendRequest(steamId)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Accept
              </button>
            </li>
          ))
        ) : (
          <h1>You don't have any pending requests</h1>
        )}
      </ul>
    </div>

    {/* Sent Requests */}
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Sent Requests</h2>
      <ul className="bg-gray-800 p-4 rounded-lg space-y-2">
        {user.sentRequests.length ? (
          user.sentRequests.map((req: any, i: number) => (
            <li key={i} className="p-2 bg-gray-700 rounded-md text-sm">
              <FriendItem steamId={req} />
            </li>
          ))
        ) : (
          <h1>You didn't send any friend requests yet</h1>
        )}
      </ul>
    </div>

    {/* Search Friend */}
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Search your friend</h2>
      <div className="bg-gray-800 p-4 rounded-lg flex space-x-4">
        <input
          type="text"
          name="friendId"
          value={id}
          onChange={handleChange}
          placeholder="Enter user ID"
          className="flex-grow p-2 bg-gray-700 text-white rounded-md"
        />
      </div>
      {id &&
        search &&
        search.map((it: any, i: number) => (
          <div className="mt-5" key={i}>
            <SearchItem
              user={it}
              fetchUserData={fetchUserData}
              setId={setId}
              steamId={user.steamId}
            />
          </div>
        ))}
    </div>
  </div>

  {/* Delete Modal */}
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
