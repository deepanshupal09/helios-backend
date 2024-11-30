import { pool } from "../config/db";


export const fetchProvidersModel = async () => {
    try {
    //   const result = await pool.query(fetchProvidersQuery);
    //   return result.rows; // Ensure the function returns a value
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error; // Rethrow the error for higher-level handling
    }
  };
  