import { pool } from "../config/db";
import { fetchActualConsumption, fetchForecastConsumption } from "./linkedDevicesQuery";

export const fetchActualConsumptionModel = async ( email : string, currentTimestamp: string) : Promise<Consumption1Type[]> => {
    try{
        const result = await pool.query(fetchActualConsumption, [email, currentTimestamp]);
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}
export const fetchForeCastConsumptionModel = async ( email:string, currentTimestamp: string) : Promise<Consumption2Type[]> => {
    try{
        const result = await pool.query(fetchForecastConsumption, [email, currentTimestamp]);
        console.log(result.rows)
        return result.rows;
    }catch(error){
        console.error("Error fetching users: ", error);
        throw error;
    }
}