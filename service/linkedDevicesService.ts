import { fetchActualConsumptionModel, fetchForeCastConsumptionModel } from "../models/linkedDevicesModel";
import { getIO } from "../socket";

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


export const fetchNotificationService = async() => {
    try{
        const io = getIO();
        io.to("capibara").emit("notification", {
            head:"What! A potential hike in Tariff rate??",
            verdict:"Switch to Solar Energy"
        });
        return {
            verdict:"Notification sent!"
        }
    }catch(error){
        throw error;
    }
}