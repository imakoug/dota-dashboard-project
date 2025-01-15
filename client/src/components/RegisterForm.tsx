import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface IUser {
  email: string;
  steamId: string;
  password: string;
  confirmpass: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [visible1, setVisible1] = useState<string>("password");
  const [visible2, setVisible2] = useState<string>("password");
  const { onRegister } = useAuth();
  const [message, setMessage] = useState("ok");
  const [user, setUser] = useState<IUser>({
    email: "",
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
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!numberRegex.test(user.steamId)) {
      setMessage("SteamId should only include numbers");
    } else if (user.password != user.confirmpass) {
      setMessage("Passwords don't match");
    } else if (!emailRegex.test(user.email)) {
      setMessage("Please enter a valid email adress");
    } else {
      const res = await onRegister!(user.email, user.password, user.steamId);
      if (res.message === "User created") {
        toast.success(`${res.message}`);
        setUser({
          email: "",
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

  const handleVisible1 = () => {
    if (visible1 == "password") setVisible1("text");
    else setVisible1("password");
  };

  const handleVisible2 = () => {
    if (visible2 == "password") setVisible2("text");
    else setVisible2("password");
  };

  const validateForm = () => {
    return !user.email || !user.steamId || !user.password || !user.confirmpass;
  };

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-100 text-sm p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="steamId"
              className="block text-gray-300 text-sm mb-2"
            >
              SteamId
            </label>
            <input
              type="text"
              id="steamId"
              name="steamId"
              value={user.steamId}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-100 text-sm p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Enter your SteamId"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm mb-2"
            >
              Password
            </label>
            <div className="relative w-full shadow-sm">
              <input
                type={visible1}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-100 text-sm p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                aria-label="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-200 transition"
                onClick={handleVisible1}
                aria-label="Toggle password visibility"
              >
                {visible1 === "password" ? (
                  <EyeInvisibleOutlined />
                ) : (
                  <EyeOutlined />
                )}
              </div>
            </div>
          </div>
          {user.password && (
            <div className="animate-fadeIn">
              <label
                htmlFor="confirmpass"
                className="block text-gray-300 text-sm mb-2"
              >
                Confirm Password
              </label>
              <div className="relative w-full shadow-sm">
                <input
                  type={visible2}
                  id="confirmpass"
                  name="confirmpass"
                  value={user.confirmpass}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-gray-100 text-sm p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  aria-label="Confirm your password"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-200 transition"
                  onClick={handleVisible2}
                  aria-label="Toggle confirm password visibility"
                >
                  {visible2 === "password" ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </div>
              </div>
            </div>
          )}
          {message !== "ok" && (
            <h1 className="text-red-500 text-sm mb-4">{message}</h1>
          )}
          <button
            type="submit"
            disabled={validateForm()}
            className={`w-full p-3 rounded text-white font-bold text-lg transition ${
              validateForm()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
            }`}
            aria-label="Submit Registration Form"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
