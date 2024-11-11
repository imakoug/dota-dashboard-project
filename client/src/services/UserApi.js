const BASE_URL = "http://localhost:3000";

const userApiService = {};

userApiService.create = (user) => {
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

userApiService.getOne = (steamId) => {
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

userApiService.getAll = () => {
  return fetch(`${BASE_URL}/all`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

userApiService.deleteOne = (steamId) => {
  return fetch(`${BASE_URL}/delete`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(steamId),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default userApiService;
