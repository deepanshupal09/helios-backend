import { pool } from "../config/db";
import { fetchActualTariffRates, fetchForecastTariffRates, fetchGridConsumptions, fetchLinkedDeviceConsumptionQuery, fetchSolarConsumedUsage, fetchSolarConsumptions, fetchSolarProducedUsage } from "./dashboardQuery";

export const fetchGridConsumptionsModel = async ( email : string, currentTimestamp: string) : Promise<DailyConsumption[]> => {
    try{
        const result = await pool.query(fetchGridConsumptions, [email, currentTimestamp]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export const fetchSolarConsumptionsModel = async ( email : string, currentTimestamp: string) : Promise<DailyConsumption[]> => {
    try{
        const result = await pool.query(fetchSolarConsumptions, [email, currentTimestamp]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export const fetchActualTariffRatesModel = async ( email : string, currentTimestamp: string) : Promise<TariffRates[]> => {
    try{
        const result = await pool.query(fetchActualTariffRates, [email, currentTimestamp]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}
export const fetchForeCastTariffRatesModel = async ( email : string, currentTimestamp: string) : Promise<TariffRates[]> => {
    try{
        const result = await pool.query(fetchForecastTariffRates, [email, currentTimestamp]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export const fetchSolarConsumedUsageModel = async ( email : string, currentTimestamp: string) : Promise<SolarType[]> => {
    try{
        const result = await pool.query(fetchSolarConsumedUsage, [email, currentTimestamp]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}
export const fetchSolarProducedUsageModel = async ( email : string, currentTimestamp: string) : Promise<SolarType[]> => {
    try{
        const result = await pool.query(fetchSolarProducedUsage, [email, currentTimestamp]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export const fetchLinkedDeviceConsumptionModel = async ( date: Date, email: string) => {
    try {
        console.log("date: ", date)
        const result = await pool.query(fetchLinkedDeviceConsumptionQuery, [date, email]);
        return result.rows;
    } catch(error) {
        console.error("Error fetching linked devices consumption: ", error);
        throw error;
    }
}


// {
//     grid_consumption:{
//         30-11-2024 (name of day):{
//             total_consumption: ,
//             submeter_1:,
//             submeter_2:,
//             submeter_3:,
//         },
//         29-11-2024 (name of day):{
//             total_consumption: ,
//             submeter_1:,
//             submeter_2:,
//             submeter_3:,
//         },
//         28-11-2024 (name of day):{
//             total_consumption: ,
//             submeter_1:,
//             submeter_2:,
//             submeter_3:,
//         }, so on.... till 8 days.
//     },
//     solar_consumption:{
//         30-11-2024 (name of day):{
//             total_consumption: ,
//             submeter_1:,
//             submeter_2:,
//             submeter_3:,
//         },
//         29-11-2024 (name of day):{
//             total_consumption: ,
//             submeter_1:,
//             submeter_2:,
//             submeter_3:,
//         },
//         28-11-2024 (name of day):{
//             total_consumption: ,
//             submeter_1:,
//             submeter_2:,
//             submeter_3:,
//         }, so on.... till 8 days.
//     }
// }