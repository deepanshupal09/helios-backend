import { Request, Response } from "express";
import { fetchConsumptionDataService, fetchNotificationService } from "../service/linkedDevicesService";


export const fetchConsumtionDataController = async (req: Request, res: Response) => {
    try {
        const email = req.headers.email as string;
        const currentTimestamp = req.headers.timestamp as string;
        if (!email || !currentTimestamp) {
            res.status(400).json({ message: "Email and timestamp are required." });
        }
        const consumptionData = await fetchConsumptionDataService(email, currentTimestamp);
        res.status(200).json(consumptionData);
    } catch (error: any) {
        res.status(error.code).send({ message: error.message });
    }
};

export const fetchNotificationController = async (req: Request, res: Response) => {
    try{
        const result = await fetchNotificationService();
        res.status(200).json(result);
    }catch (error: any){
        res.status(error.code).send({ message: error.message });
    }
}