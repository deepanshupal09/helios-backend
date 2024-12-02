import { pool } from "../config/db";
import { fetchSolarIrradiationQuery, fetchSolarIrradiationWeekQuery, fetchSolarProductionQuery, fetchSolarProductionWeekQuery } from "./solarQuery";

export const fetchSolarProductionModel = async (email: string, date: Date) => {
  try {
    const result = await pool.query(fetchSolarProductionQuery, [email, date]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching solar production: ", error);
    throw error;
  }
}
export const fetchSolarProductionWeekModel = async (email: string, date: Date) => {
  try {
    const result = await pool.query(fetchSolarProductionWeekQuery, [email, date]);
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
export const fetchSolarIrradianceWeekModel = async (date: Date) => {
  try {
    const result = await pool.query(fetchSolarIrradiationWeekQuery, [date]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching solar production: ", error);
    throw error;
  }
};
