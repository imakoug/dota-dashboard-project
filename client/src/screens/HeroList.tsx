import { useState, useEffect } from "react";
import dotaApiService from "../services/DotaApi";
import Hero from "../components/Hero";
import { useLocation } from "react-router-dom";
import { IHero } from "../types";
import BackButton from "../components/Backbutton";

function HeroList() {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    const steamId = user.steamId;
    const getHeroes = async (steamId: string) => {
      const res = await dotaApiService.getHeroesPlayed!(steamId);
      setHeroes(res);
    };
    getHeroes(steamId);
  }, []);

  if (heroes.length < 1) {
    return (
      <section className="bg-gray-900 text-gray-100 min-h-screen p-8">
        <h1 className="text-center text-gray-300 mt-10">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen p-8">
      <BackButton></BackButton>
      <h2 className="text-3xl font-bold text-gray-400 mb-6 text-center">
        Hero Statistics
      </h2>
      <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="p-4">Hero</th>
            <th className="p-4">WR%</th>
            <th className="p-4">Total Games</th>
            <th className="p-4">Wins</th>
            <th className="p-4">Losses</th>
          </tr>
        </thead>
        <tbody>
          {heroes.slice(0, 20).map((hero: IHero) => (
            <Hero key={hero.hero_id} hero={hero}></Hero>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default HeroList;
