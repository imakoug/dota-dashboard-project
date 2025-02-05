import React from "react";
import { useEffect, useState } from "react";
import dotaApiService from "../services/DotaApi";

const Home = () => {
  const [players, setPlayers] = useState<number>(0);

  useEffect(() => {
    const getDistrib = async () => {
      const res = await dotaApiService.getDistributions!();
      if (res.error) {
        console.error("Error fetching data");
      } else {
        setPlayers(res.ranks.sum.count);
      }
    };
    getDistrib();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-6">
          Dota Dashboard: The Ultimate Player Stats Hub
        </h1>
        <h2 className="text-lg text-gray-300 mb-4">
          Stay ahead in the game with Dota Dashboard, your all-in-one platform
          for tracking, analyzing, and improving your Dota 2 performance.
          Whether you’re a casual player aiming to get better or a competitive
          gamer looking to gain an edge, Dota Dashboard offers powerful
          insights into your matches and personal stats. View hero statistics
          and track your win/loss history.
        </h2>
        <h2 className="text-lg text-gray-300 mb-8">
          With an intuitive, easy-to-navigate interface, Dota Dashboard makes it
          simple to see where you’re excelling and where there’s room to grow.
          Dive deep into metrics and compare your progress over time. Gain
          strategic advantages, refine your skills, and become the player
          you’ve always aspired to be with Dota Dashboard.
        </h2>
        <div className="bg-gray-800 py-6 px-4 rounded-lg shadow-md inline-block">
          <p className="text-xl font-medium text-gray-300">
            Total DOTA 2 players
          </p>
          <strong className="text-3xl font-extrabold text-white">
            {players}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Home;
