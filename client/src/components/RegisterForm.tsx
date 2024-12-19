import React, { useState } from "react";
import userApiService from "../services/UserApi";
import { useNavigate } from "react-router-dom";

interface IUser {
  username: string;
  steamId: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    username: "",
    steamId: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    var numberRegex = /^\d+$/;
    if (!numberRegex.test(user.steamId)) {
      alert("SteamId should include only numbers");
    } else {
      const res = await userApiService.create!(user);
      if (res.message === "User created!") {
        alert(`${res.message}`);
        setUser({
          username: "",
          steamId: "",
        });
        navigate("/profile");
      } else {
        alert(`${res.message}`);
        return;
      }
    }
  };

  const validateForm = () => {
    return !user.username || !user.steamId;
  };

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create a User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="steamId" className="block text-gray-300 mb-2">
              SteamId
            </label>
            <input
              type="text"
              id="steamId"
              name="steamId"
              value={user.steamId}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Steam ID"
            />
          </div>
          <button
            type="submit"
            disabled={validateForm()}
            className={`w-full p-2 rounded text-white font-bold ${
              validateForm()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 transition duration-300"
            }`}
          >
            Add User
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
