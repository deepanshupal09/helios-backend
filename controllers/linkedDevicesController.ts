import { Request, Response } from "express";
import { fetchConsumptionDataService, sendNotificationService } from "../service/linkedDevicesService";


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

export const sendNotification = async (req: Request, res: Response) => {
    try{
        const head = req.body.head as string;
        const verdict = req.body.verdict as string;
        const result = await sendNotificationService(head, verdict);
        res.status(200).json(result);
    }catch (error: any){
        res.status(error.code).send({ message: error.message });
    }
}