const BASE_URL = "http://localhost:3000";

interface IUserService {
  register?: (user: IUser) => Promise<any>;
  login?: (email: string, password: string) => Promise<any>;
  getUser?: (token: string) => Promise<any>;
  delete?: (user: IUser) => Promise<any>;
  getUsers?: () => Promise<any>;
}

export interface IUser {
  email: string;
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

userApiService.login = (email: string, password: string) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
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

userApiService.getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then((res) => res.json())
    .catch((e) => console.log(e, "Error fetching users"));
};

export default userApiService;
