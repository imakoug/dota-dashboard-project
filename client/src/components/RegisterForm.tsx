import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface IUser {
  username: string;
  steamId: string;
  password: string;
  confirmpass: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { onRegister } = useAuth();
  const [message, setMessage] = useState("ok");
  const [user, setUser] = useState<IUser>({
    username: "",
    steamId: "",
    password: "",
    confirmpass: "",
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
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(user.steamId)) {
      setMessage("SteamId should only include numbers");
    } else if (user.password != user.confirmpass) {
      setMessage("Passwords don't match");
    } else {
      const res = await onRegister!(user.username, user.password, user.steamId);
      if (res.message === "User created") {
        toast.success(`${res.message}`);
        setUser({
          username: "",
          steamId: "",
          password: "",
          confirmpass: "",
        });
        navigate("/profile");
      } else {
        setMessage(`${res.message}`);
        return;
      }
    }
  };

  const validateForm = () => {
    return (
      !user.username || !user.steamId || !user.password || !user.confirmpass
    );
  };

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Sign Up
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
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmpass"
              name="confirmpass"
              value={user.confirmpass}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {message !== "ok" && (
            <h1 className="text-red-500 text-sm mb-4">{message}</h1>
          )}
          <button
            type="submit"
            disabled={validateForm()}
            className={`w-full p-2 rounded text-white font-bold ${
              validateForm()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 transition duration-300"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
