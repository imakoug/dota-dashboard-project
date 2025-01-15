import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MatchList from "./MatchList";
import HeroList from "./HeroList";
import Register from "./RegisterForm";
import Profile from "./Profile";
import MatchDetails from "./MatchDetails";
import FriendsPage from "./FriendsPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./LoginForm";
import News from "./News";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matches" element={<MatchList />} />
        <Route path="/heroes" element={<HeroList />} />
        <Route path="/matches/details" element={<MatchDetails />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
