import { pool } from "../config/db";
import { fetchGridConsumptions, fetchSolarConsumptions } from "./dashboardQuery";

export const fetchgGridConsumptionsModel = async ( email : string) : Promise<GridConsumptionType[]> => {
    try{
        const result = await pool.query(fetchGridConsumptions, [email]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}

export const fetchgSolarConsumptionsModel = async ( email : string) : Promise<SolarConsumptionType[]> => {
    try{
        const result = await pool.query(fetchSolarConsumptions, [email]);
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