import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import MatchList from "../screens/MatchList";
import HeroList from "../screens/HeroList";
import Register from "../screens/RegisterForm";
import Profile from "../screens/Profile";
import MatchDetails from "../screens/MatchDetails";
import FriendsPage from "../screens/FriendsPage";
import Login from "../screens/LoginForm";
import News from "../screens/News";
import Updates from "../screens/Updates";
import { Toaster } from "react-hot-toast";
import Teams from "../screens/Teams";
import Tournaments from "../screens/Tournaments";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div>
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
        <Route path="/updates" element={<Updates />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
