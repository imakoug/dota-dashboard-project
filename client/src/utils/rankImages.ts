const rankImages: any = {
  11: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/85/SeasonalRank1-1.png",
  12: "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ee/SeasonalRank1-2.png",
  13: "https://static.wikia.nocookie.net/dota2_gamepedia/images/0/05/SeasonalRank1-3.png",
  14: "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6d/SeasonalRank1-4.png",
  15: "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2b/SeasonalRank1-5.png",
  21: "https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c7/SeasonalRank2-1.png",
  22: "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/2c/SeasonalRank2-2.png",
  23: "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f5/SeasonalRank2-3.png",
  24: "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b4/SeasonalRank2-4.png",
  25: "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/32/SeasonalRank2-5.png",
  31: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/82/SeasonalRank3-1.png",
  32: "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/6e/SeasonalRank3-2.png",
  33: "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/67/SeasonalRank3-3.png",
  34: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/87/SeasonalRank3-4.png",
  35: "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b1/SeasonalRank3-5.png",
  41: "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/76/SeasonalRank4-1.png",
  42: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/87/SeasonalRank4-2.png",
  43: "https://static.wikia.nocookie.net/dota2_gamepedia/images/6/60/SeasonalRank4-3.png",
  44: "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/4a/SeasonalRank4-4.png",
  45: "https://static.wikia.nocookie.net/dota2_gamepedia/images/a/a3/SeasonalRank4-5.png",
  51: "https://static.wikia.nocookie.net/dota2_gamepedia/images/7/79/SeasonalRank5-1.png",
  52: "https://static.wikia.nocookie.net/dota2_gamepedia/images/5/52/SeasonalRank5-2.png",
  53: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/88/SeasonalRank5-3.png",
  54: "https://static.wikia.nocookie.net/dota2_gamepedia/images/2/25/SeasonalRank5-4.png",
  55: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8e/SeasonalRank5-5.png",
  61: "https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e0/SeasonalRank6-1.png",
  62: "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/1c/SeasonalRank6-2.png",
  63: "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/da/SeasonalRank6-3.png",
  64: "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/db/SeasonalRank6-4.png",
  65: "https://static.wikia.nocookie.net/dota2_gamepedia/images/4/47/SeasonalRank6-5.png",
  71: "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/b7/SeasonalRank7-1.png",
  72: "https://static.wikia.nocookie.net/dota2_gamepedia/images/8/8f/SeasonalRank7-2.png",
  73: "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/fd/SeasonalRank7-3.png",
  74: "https://static.wikia.nocookie.net/dota2_gamepedia/images/1/13/SeasonalRank7-4.png",
  75: "https://static.wikia.nocookie.net/dota2_gamepedia/images/3/33/SeasonalRank7-5.png",
};

function getRankImage(rank: number) {
  if (rank > 75) return "https://static.wikia.nocookie.net/dota2_gamepedia/images/f/f2/SeasonalRankTop0.png";

  for (let ranker in rankImages) {
    if (ranker == rank.toString()) return rankImages[ranker];
  }
}

export default getRankImage;