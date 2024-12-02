import { Request, Response } from "express";
import { fetchConsumptionService } from "../service/dashboardService";

export const fetchConsumptionController = async (req: Request, res: Response) => {
  try {
    const email = req.headers.email as string;
    const currentTimestamp = req.headers.timestamp as string;
    if (!email || !currentTimestamp) {
      res.status(400).send({ message: "Email and timestamp are required." });
    }
    const consumptionData = await fetchConsumptionService(email, currentTimestamp);
    res.status(200).send(consumptionData);
  } catch (error: any) {
    res.status(error.code).send({ message: error.message });
  }
};
