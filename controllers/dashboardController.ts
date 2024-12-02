import { Request, Response } from "express";
import { fetchConsumptionService, fetchTariffRatesService } from "../service/dashboardService";

export const fetchConsumptionController = async (req: Request, res: Response) => {
    try {
        const email = req.headers.email as string;
        const currentTimestamp = req.headers.timestamp as string;
        if (!email || !currentTimestamp) {
            res.status(400).json({ message: "Email and timestamp are required." });
        }
        const consumptionData = await fetchConsumptionService(email, currentTimestamp);
        res.status(200).json(consumptionData);
    } catch (error: any) {
        res.status(error.code).send({ message: error.message });
    }
};

export const fetchTariffRatesController = async (req: Request, res: Response) => {
    try {
        const email = req.headers.email as string;
        const currentTimestamp = req.headers.timestamp as string;
        if (!email || !currentTimestamp) {
            res.status(400).json({ message: "Email and timestamp are required." });
        }
        const tariffData = await fetchTariffRatesService(email, currentTimestamp);
        res.status(200).json(tariffData);
    } catch (error: any) {
        res.status(error.code).send({ message: error.message });
    }
};
