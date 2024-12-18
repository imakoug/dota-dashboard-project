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
      }
      if (heroe.id === hero.hero_id) setImg(heroe.imgpath);
    }
  }, [heroId]);

  return (
    <div className="match-row">
      <div className="match-hero">
        <img src={img} alt={name} className="hero-image" />
        <div className="hero-info">
          <div className="hero-name">{name}</div>
        </div>
      </div>
      <div className="wr-bar">
        <div
          className="wr-bar-segment wins"
          style={{
            width: `${(hero.win / hero.games) * 100}%`,
          }}
        ></div>
        <div
          className="wr-bar-segment loses"
          style={{
            width: `${((hero.games - hero.win) / hero.games) * 100}%`,
          }}
        ></div>
      </div>
      <div className="winrate">
        <div className="hero-name">
          {((hero.win / hero.games) * 100).toFixed(2)} %
        </div>
      </div>
      <div className="winrate"></div>
      <div className="winrate">
        <div className="hero-name">{hero.games}</div>
      </div>

      <div className="winrate"></div>
      <div className="winrate">
        <div className="hero-name">{hero.win}</div>
      </div>
      <div className="winrate"></div>
      <div className="winrate">
        <div className="hero-name">{hero.games - hero.win}</div>
      </div>
    </div>
  );
}

export default Hero;
