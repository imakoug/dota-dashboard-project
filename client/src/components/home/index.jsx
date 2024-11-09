import React from "react";
import { useEffect, useState } from "react";
import dotaApiService from "../../services/dotaApi";
const initialState = {
  sum: {
    count: 0,
  }
}

const Home = () => {
  const [players, setPlayers] = useState(initialState);

  useEffect(() => {
    const getDistrib = async () => {
      const res = await dotaApiService.getDistributions();
      if (res.error) {
      } else {
        setPlayers(res.ranks);
      }
    };
    getDistrib();
  }, []);

  return (
    <div className="home">
      <h1>Dota Dashboard: The Ultimate Player Stats Hub</h1>
      <h2>
        Stay ahead in the game with Dota Dashboard, your all-in-one platform for
        tracking, analyzing, and improving your Dota 2 performance. Whether
        you’re a casual player aiming to get better or a competitive gamer
        looking to gain an edge, Dota Dashboard offers powerful insights into
        your matches and personal stats. View hero statistics and track your
        win/loss history.
      </h2>
      <h2>
        With an intuitive, easy-to-navigate interface, Dota Dashboard makes it
        simple to see where you’re excelling and where there’s room to grow.
        Dive deep into metrics and compare your progress over time. Gain
        strategic advantages, refine your skills, and become the player you’ve
        always aspired to be with Dota Dashboard.
      </h2>
      <div className="player-det">
        Total DOTA 2 players <br />
        <strong>{players.sum.count}</strong>
      </div>
    </div>
  );
};

export default Home;
