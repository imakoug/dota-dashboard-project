import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MatchList from "./MatchList";
import HeroList from "./HeroList";
import Register from "./RegisterForm";
import Profile from "./Profile";
import MatchDetails from "./MatchDetails";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/matches" element={<MatchList></MatchList>}></Route>
        <Route path="/heroes" element={<HeroList></HeroList>}></Route>
        <Route path="/createUser" element={<Register></Register>}></Route>
        <Route path="/matches/details" element={<MatchDetails></MatchDetails>}></Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
