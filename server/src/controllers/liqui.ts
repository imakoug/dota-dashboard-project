import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const API_KEY: string | undefined = process.env.API_KEY;

export const getPatchNotes = async (req: Request, res: Response) => {
  try {
    const apiResponse = await fetch(
      "https://api.liquipedia.net/api/v3/datapoint?wiki=dota2&conditions=[[type::patch]]&order=pageid DESC&limit=25",
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
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getActiveTeams = async (req: Request, res: Response) => {
  try {
    const apiResponse = await fetch(
      "https://api.liquipedia.net/api/v3/team?wiki=dota2&conditions=[[status::active]] AND [[earnings::>100000]]",
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
