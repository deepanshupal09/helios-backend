import { pool } from "../config/db";
import { fetchGridConsumptions, fetchSolarConsumptions } from "./dashboardQuery";

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