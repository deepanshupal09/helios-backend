import { fetchActualConsumptionModel, fetchForeCastConsumptionModel } from "../models/linkedDevicesModel";
import { getIO } from "../socket";
import dotenv from "dotenv"

dotenv.config();

export const fetchConsumptionDataService = async (email:string, currentTimestamp: string): Promise<ConsumptionData> => {
    try{
        const actualConsumption: Consumption1Type[] = await fetchActualConsumptionModel(email, currentTimestamp);
        const forecastConsumption: Consumption2Type[] = await fetchForeCastConsumptionModel(email,currentTimestamp);
        return { actual_consumption: actualConsumption, forecast_consumption: forecastConsumption };
    }catch(error){
        console.error('Error fetching tariff data: ', error);
        throw error;
    }
}


export const sendNotificationService = async(head: string, verdict: string) => {
    try{
        const io = getIO();
        io.to(process.env.ROOM_CODE||"capibara").emit("notification", {
            title:head,
            subTitle:verdict
        });
        return {
            verdict:"Notification sent!"
        }
    }catch(error){
        throw error;
    }
}