const BASE_URL = "http://localhost:3000";

interface IUserService {
  register?: (user: IUser) => Promise<any>;
  login?: (username: string, password: string) => Promise<any>;
  getUser?: (token: string) => Promise<any>;
  delete?: (user: IUser) => Promise<any>;
}

export interface IUser {
  username: string;
  password: string;
  steamId: string;
}

const userApiService: IUserService = {};

userApiService.register = (user: IUser) => {
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

userApiService.login = (username: string, password: string) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

userApiService.getUser = (token: string) => {
  return fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

userApiService.delete = (user: IUser) => {
  return fetch(`${BASE_URL}/delete`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default userApiService;
