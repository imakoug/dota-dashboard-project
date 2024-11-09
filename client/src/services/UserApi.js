const BASE_URL = "http://localhost:3000";

const userApiService = {};

userApiService.create = async (user) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

userApiService.getOne = async (steamId) => {
  return fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(steamId),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

userApiService.getAll = async () => {
  return fetch(`${BASE_URL}/all`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default userApiService;