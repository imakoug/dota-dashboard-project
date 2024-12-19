const BASE_URL = "http://localhost:3000";

interface IUserService {
  create?: (user: IUser) => Promise<any>;
  getOne?: (steamId: string) => Promise<any>;
  getAll?: () => Promise<any>;
  deleteOne?: (steamId: string) => Promise<any>;
}

export interface IUser {
  username: string;
  steamId: string;
}

const userApiService: IUserService = {};

userApiService.create = (user: IUser) => {
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

userApiService.getOne = (steamId: string) => {
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

userApiService.deleteOne = (steamId: string) => {
  return fetch(`${BASE_URL}/delete`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({steamId}),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default userApiService;
