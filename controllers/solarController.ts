import { Request, Response } from "express";
import { fetchSolarProductionService, fetchSolarYieldService, sellSolarEnergyService, updateStatusService } from "../service/solarService";

export const fetchSolarProduction = async (req: Request, res: Response) => {
  const email = req.headers.email as string;
  const date = req.headers.date as string;
  const type=req.headers.type as string;  
  try {
    const result = await fetchSolarProductionService(email, new Date(date), type)
    res.status(200).send(result)
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};

export const sellSolarEnergy = async (req: Request, res: Response) => {
  const email = req.headers.email as string;
  const power = req.headers.power as string;
  try {
    const result = await sellSolarEnergyService(Number(power), email)
    res.status(200).send(result)
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};
export const fetchSolarYield = async (req: Request, res: Response) => {
  const email = req.headers.email as string;
  const date = req.headers.date as string;
  try {
    const result = await fetchSolarYieldService(new Date(date), email)
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const status = req.body.status as string;
  try {
    const result = await updateStatusService(status, email)
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};
