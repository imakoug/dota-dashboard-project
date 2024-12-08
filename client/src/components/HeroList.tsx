import { useState, useEffect } from "react";
import dotaApiService from "../services/DotaApi";
import Hero from "./Hero";
import { useLocation } from "react-router-dom";
import { IHero } from "../types";

function HeroList() {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    const steamId = user.steamId;
    const getHeroes = async (steamId: string) => {
      const res = await dotaApiService.getHeroesPlayed!(steamId);
      setHeroes(res);
      console.log(heroes)
    };
    getHeroes(steamId);
  }, []);

  return (
    <section className="match-list-section">
      {heroes.length > 1 && heroes[0].games < 1 && (
        <h1>Your Steam ID is not valid or your profile is hidden</h1>
      )}
      {heroes.length > 1 && heroes[0].games > 0 && (
        <tr className="info">
          <th>Hero</th>
          <th></th>
          <th></th>
          <th>WR%</th>
          <th>Total Games</th>
          <th>Wins</th>
          <th>Losses</th>
        </tr>
      )}
      <div className="matches-list">
        {heroes.length > 1 && heroes[0].games > 0 &&
          heroes
            .slice(0, 20)
            .map((hero: any) => <Hero key={hero.hero_id} hero={hero}></Hero>)}
      </div>
    </section>
  );
}

export default HeroList;
