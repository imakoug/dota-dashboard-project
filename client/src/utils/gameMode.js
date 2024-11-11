const gameModes = {
  0: "Unknown",
  1: "All Pick",
  2: "Captains Mode",
  3: "Random Draft",
  4: "Single Draft",
  5: "All Random",
  6: "Intro",
  7: "The Diretide",
  8: "Reverse Captains Mode",
  9: "Greeviling",
  10: "Tutorial",
  11: "Mid Only",
  12: "Least Played",
  13: "Limited Heroes",
  14: "Compendium Matchmaking",
  15: "Custom",
  16: "Captains Draft",
  17: "Balanced Draft",
  18: "Ability Draft",
  19: "Event",
  20: "All Random Deathmatch",
  21: "1v1 Mid",
  22: "Ranked",
  23: "Turbo",
  24: "Mutation"
};



const getGameMode = (num) => {
  for (let mode in gameModes) {
    if (mode == num) return gameModes[mode];
  }
};

export default getGameMode;