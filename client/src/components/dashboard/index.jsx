import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home";
import MatchList from "../matchList/matchlist";
import HeroList from "../herolist";



const Dashboard = () => {
  return (
    <div className="dashboard">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recentMatches" element={<MatchList></MatchList>}></Route>
        <Route path="/heroes" element={<HeroList></HeroList>}></Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
