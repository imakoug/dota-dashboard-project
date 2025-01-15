import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<string>("password");
  const { onLogin } = useAuth();
  const [message, setMessage] = useState("ok");
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
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
    const res = await onLogin!(user.email, user.password);
    if (res.message != "Login successful") {
      setMessage(res.message);
    } else {
      toast.success(res.message);
      navigate("/profile");
    }
  };

  const handleVisible = () => {
    if (visible == "password") setVisible("text");
    else setVisible("password");
  };

  const validateForm = () => {
    return !user.email || !user.password;
  };

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-100 text-sm p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Enter your email"
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
                type={visible}
                id="password"
                name="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-100 text-sm p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                aria-label="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-200 transition"
                onClick={handleVisible}
                aria-label="Toggle password visibility"
              >
                {visible === "password" ? (
                  <EyeInvisibleOutlined />
                ) : (
                  <EyeOutlined />
                )}
              </div>
            </div>
          </div>
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
            aria-label="Submit Login Form"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
