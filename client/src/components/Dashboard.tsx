import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MatchList from "./MatchList";
import HeroList from "./HeroList";
import Register from "./RegisterForm";
import ProfileList from "./ProfileList";
import MatchDetails from "./MatchDetails";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div>
        <Toaster position="bottom-right" reverseOrder={false}></Toaster>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileList></ProfileList>}></Route>
        <Route path="/matches" element={<MatchList></MatchList>}></Route>
        <Route path="/heroes" element={<HeroList></HeroList>}></Route>
        <Route path="/createUser" element={<Register></Register>}></Route>
        <Route
          path="/matches/details"
          element={<MatchDetails></MatchDetails>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
