const BASE_URL = "https://api.opendota.com/api/players";
const BASE_ID = 1096081861;

const dotaApiService = {};

dotaApiService.getRecentMatches = (uid) => { // get 20 matches
  return fetch(`${BASE_URL}/${uid}/recentMatches`).then((res) => res.json()).catch((err) => console.log(err));
};

dotaApiService.getMatchHistory = (uid) => { //get 800+ matches
  return fetch(`${BASE_URL}/${uid}/matches`).then((res) => res.json()).catch((err) => console.log(err));
};

dotaApiService.getHeroesPlayed = (uid) => {
  return fetch(`${BASE_URL}/${uid}/heroes`).then((res) => res.json()).catch((err) => console.log(err));
}



export default dotaApiService;