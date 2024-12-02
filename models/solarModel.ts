import { pool } from "../config/db";
import { fetchEnergyYieldQuery, fetchSolarIrradiationQuery, fetchSolarIrradiationWeekQuery, fetchSolarProductionQuery, fetchSolarProductionWeekQuery, putTransactionQuery, updateStatusQuery } from "./solarQuery";

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

export const putTransactionModel = async (transaction: TransactionType) => {
  try {
    await pool.query(putTransactionQuery, [transaction.total_power_sold, transaction.timestamp, transaction.transaction_id, transaction.email])
    return {message: "Transaction inserted successfully"}
  } catch(error) {
    console.error("Error putting transaction, ", error);
    throw error;
  }
} 

export const fetchSolarYieldModel = async (date: Date, email: string) => {
  try {
    const result = await pool.query(fetchEnergyYieldQuery, [date, email]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching solar yield: ", error)
    throw error;
  }
}
export const updateStatusModel = async (status: string, email: string) => {
  try {
    const result = await pool.query(updateStatusQuery, [status, email]);
    return {message: "Status updated successfully!"};
  } catch (error) {
    console.error("Error updating status: ", error)
    throw error;
  }
}
