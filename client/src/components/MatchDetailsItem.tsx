import items from "../utils/items";
import heroimg from "../utils/heroimg";
import { useEffect, useState } from "react";

const MatchDetailsItem = ({ player }: any) => {
  const [its, setIts] = useState([]);
  const [img, setImg] = useState<string>("");
  const [heroname, setHeroname] = useState<string>("");

  useEffect(() => {
    const itemNames: any = [];
    for (let i = 0; i <= 5; i++) {
      const itemId = player[`item_${i}`];
      for (let item in items) {
        if (items[item].id === itemId) itemNames.push(items[item]);
      }
    }
    for (let hero of heroimg) {
      if (hero.id === player.hero_id) {
        setImg(hero.imgpath);
        setHeroname(hero.localized_name);
      }
    }
    setIts(itemNames);
  }, [player]);

  return (
    <tr className="hover:bg-gray-700">
      <td>
        <div className="py-3 px-6 flex items-center">
          <img className="w-20 h-15 mr-4 rounded-lg" src={img} alt="Hero image" />
          <div className="font-medium">{heroname}</div>
        </div>
      </td>
      <td className="py-2 px-3 text-left">
        <h2 className="truncate text-sm font-medium">
          {player.personaname ? player.personaname : "No username"}
        </h2>
      </td>
      <td className="py-2 px-3 text-center">{player.kills}</td>
      <td className="py-2 px-3 text-center">{player.deaths}</td>
      <td className="py-2 px-3 text-center">{player.assists}</td>
      <td className="py-2 px-3 text-center text-yellow-400">
        {player.net_worth}
      </td>
      <td className="py-2 px-3 text-center">{player.last_hits}</td>
      <td className="py-2 px-3 text-center">{player.denies}</td>
      <td className="py-2 px-3 text-center">{player.gold_per_min}</td>
      <td className="py-2 px-3 text-center">{player.xp_per_min}</td>
      <td className="py-2 px-3 text-center">{player.hero_damage}</td>
      <td className="py-2 px-3 text-center">{player.hero_healing}</td>
      <td className="py-2 px-3 text-center">{player.tower_damage}</td>
      <td className="py-2 px-3">
        <div className="flex justify-center items-center space-x-1">
          {its.length > 1 &&
            its.map((it: any, i: number) => (
              <img
                key={i}
                className="w-12 h-10 rounded-sm"
                src={it.img}
                alt="Item"
              />
            ))}
        </div>
      </td>
    </tr>
  );
};

export default MatchDetailsItem;
