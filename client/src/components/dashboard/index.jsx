import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home";
import MatchList from "../matchList/matchlist";
import HeroList from "../herolist";
import Register from "../registerForm";
import Profile from "../profile/profile";
import MatchDetails from "../matchDetails";

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
