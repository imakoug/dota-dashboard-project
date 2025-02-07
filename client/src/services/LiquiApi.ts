const BASE_URL = "http://localhost:3000/liqui";

interface ILiquiService {
  getPatchNotes?: () => Promise<any>;
  getActiveTeams?: () => Promise<any>;
  getActiveTeamPlayers?: (teampagename: string) => Promise<any>;
}

const liquiApiService: ILiquiService = {};

liquiApiService.getPatchNotes = () => {
  return fetch(`${BASE_URL}/patchnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

liquiApiService.getActiveTeams = () => {
  return fetch(`${BASE_URL}/activeteams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

liquiApiService.getActiveTeamPlayers = (teampagename: string) => {
  return fetch(`${BASE_URL}/teamplayers/${teampagename}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default liquiApiService;
