import { Request, Response } from "express";
import { fetchSolarProductionService } from "../service/solarService";

export const fetchSolarProduction = async (req: Request, res: Response) => {
  const email = req.headers.email as string;
  const date = req.headers.date as string;
  try {
    const result = await fetchSolarProductionService(email, new Date(date))
    res.status(200).send(result)
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};
