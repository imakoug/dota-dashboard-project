import { IHero } from "../types";
import heroimg from "../utils/heroimg";
import { useState, useEffect } from "react";

interface IHeroProps {
  hero: IHero;
}

const Hero = ({ hero }: IHeroProps) => {
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const heroId = hero.hero_id;

  useEffect(() => {
    for (let heroe of heroimg) {
      if (heroe.id === hero.hero_id) {
        setName(heroe.localized_name);
        setImg(heroe.imgpath);
      }
    }
  }, [heroId]);

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-300">
      <td className="p-2 flex items-center space-x-2">
        <img
          src={img}
          alt={name}
          className="rounded-lg object-cover"
        />
        <span className="text-gray-200 font-medium text-base">{name}</span>
      </td>
      <td className="p-2 text-center">
        <div className="w-40 bg-red-600 rounded-full h-5 overflow-hidden mx-auto">
          <div
            className="bg-green-500 h-full"
            style={{
              width: `${(hero.win / hero.games) * 100}%`,
            }}
          ></div>
        </div>
        <span className="text-sm text-gray-400 mt-1 block">
          {((hero.win / hero.games) * 100).toFixed(2)}%
        </span>
      </td>
      <td className="p-2 text-center text-sm">{hero.games}</td>
      <td className="p-2 text-center text-sm">{hero.win}</td>
      <td className="p-2 text-center text-sm">{hero.games - hero.win}</td>
    </tr>
  );
};

export default Hero;
