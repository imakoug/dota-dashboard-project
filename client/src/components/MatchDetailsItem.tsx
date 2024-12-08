import items from "../utils/items";
import heroimg from "../utils/heroimg";
import { useEffect, useState } from "react";

const MatchDetailsItem = ({ player }: any) => {
  const [its, setIts] = useState([]);
  const [img, setImg] = useState<string>("");

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
      }
    }
    setIts(itemNames);
    console.log(its)
  }, []);

  return (
    <tr>
      <td>
        <div>
          <img src={img}></img>
        </div>
      </td>
      <td>
        <h2>{player.personaname ? player.personaname : "no username"}</h2>
      </td>
      <td className="kil">{player.kills}</td>
      <td>{player.deaths}</td>
      <td className="asis">{player.assists}</td>
      <td className="net">{player.net_worth}</td>
      <td>{player.last_hits}</td>
      <td>{player.denies}</td>
      <td>{player.gold_per_min}</td>
      <td>{player.xp_per_min}</td>
      <td>{player.hero_damage}</td>
      <td>{player.hero_healing}</td>
      <td>{player.tower_damage}</td>
      <td>
        <div>{its.length > 1 && its.map((it: any, i: number) => <img key={i} src={it.img}></img>)}</div>
      </td>
    </tr>
  );
};

export default MatchDetailsItem;
