import { Request, Response } from "express";
import { fetchBatteryService, fetchSolarProductionService, fetchSolarYieldService, fetchStatusService, sellSolarEnergyService, updateBatteryService, updateStatusService } from "../service/solarService";

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
export const updateBattery = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const battery = req.body.battery as number;
  try {
    const result = await updateBatteryService(battery, email)
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};
export const fetchStatus = async (req: Request, res: Response) => {
  const email = req.headers.email as string;
  try {
    const result = await fetchStatusService(email)
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};
export const fetchBattery = async (req: Request, res: Response) => {
  const email = req.headers.email as string;
  try {
    const result = await fetchBatteryService(email)
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send({ message: error.message || "Something went wrong! Please try again later." });
  }
};
