import { pool } from "../config/db";
import { fetchSolarIrradiationQuery, fetchSolarProductionQuery } from "./solarQuery";

export const fetchSolarProductionModel = async (email: string, date: Date) => {
  try {
    const result = await pool.query(fetchSolarProductionQuery, [email, date]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching solar production: ", error);
    throw error;
  }
};
export const fetchSolarIrradianceModel = async (date: Date) => {
  try {
    const result = await pool.query(fetchSolarIrradiationQuery, [date]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching solar production: ", error);
    throw error;
  }
};
