const BASE_URL_PLAYER = "https://api.opendota.com/api/players";
const BASE_URL_MATCH = "https://api.opendota.com/api/matches";
const BASE_URL = "https://api.opendota.com/api/";

interface IDotaService {
  getRecentMatches?: (uid: string) => Promise<any>;
  getMatchHistory?: (uid: string) => Promise<any>;
  getHeroesPlayed?: (uid: string) => Promise<any>;
  getMatch?: (matchId: string) => Promise<any>;
  getDistributions?: () => Promise<any>;
  getUserInfo?: (steamId: string) => Promise<any>;
  getWr?: (steamId: string) => Promise<any>;
}

const dotaApiService: IDotaService = {};

dotaApiService.getRecentMatches = (uid: string) => {
  // get 20 matches
  return fetch(`${BASE_URL_PLAYER}/${uid}/recentMatches`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "Something went wrong!"));
};

dotaApiService.getMatchHistory = (uid: string) => {
  //get 800+ matches
  return fetch(`${BASE_URL_PLAYER}/${uid}/matches`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "Something went wrong!"));
};

dotaApiService.getHeroesPlayed = (uid: string) => {
  return fetch(`${BASE_URL_PLAYER}/${uid}/heroes`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "Something went wrong!"));
};

dotaApiService.getMatch = (matchId: string) => {
  return fetch(`${BASE_URL_MATCH}/${matchId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "Something went wrong!"));
};

dotaApiService.getDistributions = () => {
  return fetch(`${BASE_URL}/distributions`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "Something went wrong!"));
};

dotaApiService.getUserInfo = (steamId: string) => {
  return fetch(`${BASE_URL_PLAYER}/${steamId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "Something went wrong!"));
};

dotaApiService.getWr = (steamId: string) => {
  return fetch(`${BASE_URL_PLAYER}/${steamId}/wl`)
    .then((res) => res.json())
    .catch((err) => console.log(err, "Error fetching winrate"));
};

export default dotaApiService;
