import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const API_KEY: string | undefined = process.env.API_KEY;
const BASE_URL = "https://api.liquipedia.net/api/v3";

export const getPatchNotes = async (req: Request, res: Response) => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/datapoint?wiki=dota2&conditions=[[type::patch]]&order=pageid DESC&limit=25`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Apikey ${API_KEY}`,
          "User-Agent": `DotaDashboard (https://github.com/imakoug/dota-dashboard-project; pats.s1889@gmail.com)`,
          "Accept-Encoding": "gzip",
        },
      }
    );
    const data = await apiResponse.json();
    res.status(200).send(data.result);
  } catch (e) {
    res.status(500).json({ error: e, message: "Server error" });
  }
};

export const getActiveTeams = async (req: Request, res: Response) => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/team?wiki=dota2&conditions=[[status::active]] AND [[earnings::>100000]]`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Apikey ${API_KEY}`,
          "User-Agent": `DotaDashboard (https://github.com/imakoug/dota-dashboard-project; pats.s1889@gmail.com)`,
          "Accept-Encoding": "gzip",
        },
      }
    );
    const data = await apiResponse.json();
    res.status(200).send(data.result);
  } catch (e) {
    res.status(500).send({ error: e, message: "Server error" });
  }
};

export const getTeamPlayers = async (req: Request, res: Response) => {
  try {
    const teampagename = req.params.teampagename;
    const apiResponse = await fetch(
      `${BASE_URL}/player?wiki=dota2&conditions=[[teampagename::${teampagename}]] AND [[status::Active]]`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Apikey ${API_KEY}`,
          "User-Agent": `DotaDashboard (https://github.com/imakoug/dota-dashboard-project; pats.s1889@gmail.com)`,
          "Accept-Encoding": "gzip",
        },
      }
    );
    const data = await apiResponse.json();
    res.status(200).send(data.result);
  } catch (e) {
    res.status(500).send({ error: e, message: "Server error" });
  }
};
