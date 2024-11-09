const BASE_URL_PLAYER = "https://api.opendota.com/api/players";
const BASE_URL_MATCH = "https://api.opendota.com/api/matches";
const BASE_URL = "https://api.opendota.com/api/";

const dotaApiService = {};

dotaApiService.getRecentMatches = (uid) => {
  // get 20 matches
  return fetch(`${BASE_URL_PLAYER}/${uid}/recentMatches`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "smth went wrongg"));
};

dotaApiService.getMatchHistory = (uid) => {
  //get 800+ matches
  return fetch(`${BASE_URL_PLAYER}/${uid}/matches`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "smth went wrongg"));
};

dotaApiService.getHeroesPlayed = (uid) => {
  return fetch(`${BASE_URL_PLAYER}/${uid}/heroes`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "smth went wrongg"));
};

dotaApiService.getMatch = (matchId) => {
  return fetch(`${BASE_URL_MATCH}/${matchId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "smth went wrongg"));
};

dotaApiService.getDistributions = () => {
  return fetch(`${BASE_URL}/distributions`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "smth went wrongg"));
};

export default dotaApiService;
