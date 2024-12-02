import { fetchActualConsumptionModel, fetchForeCastConsumptionModel } from "../models/linkedDevicesModel";

// export const fetchConsumptionDataService = async (email: string, currentTimestamp: string): Promise<ConsumptionData> => {
//     try {
//         const actualConsumption: Consumption1Type[] = await fetchActualConsumptionModel(email, currentTimestamp);
//         const forecastConsumption: Consumption2Type[] = await fetchForeCastConsumptionModel(email, currentTimestamp);

//         const actualTimestamps = new Set(actualConsumption.map(data => data.timestamp));
//         const filteredForecastConsumption = forecastConsumption.filter(data =>
//             actualTimestamps.has(data.datetime)
//         );

//         return { 
//             actual_consumption: actualConsumption, 
//             forecast_consumption: filteredForecastConsumption 
//         };
//     } catch (error) {
//         console.error('Error fetching tariff data: ', error);
//         throw error;
//     }
// };

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