import { pool } from "../config/db";
import { fetchProvidersQuery, fetchUserQuery, registerUserQuery } from "./authQuery";

export const fetchUserModel = async (email: string): Promise<UserType | null> => {
  try {
    const result = await pool.query(fetchUserQuery, [email]);
    return result.rows[0] || null; // Ensure the function returns a value
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error; // Rethrow the error for higher-level handling
  }
};

export const registerUserModel = async (user: UserType) => {
  try {
    const result = await pool.query(registerUserQuery, [user.name, user.email, user.provider_id, user.battery, user.battery_capacity, user.phone, user.password]);
    return result.rows[0] || null; // Ensure the function returns a value
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error; // Rethrow the error for higher-level handling
  }
};

export const fetchProvidersModel = async () => {
  try {
    const result = await pool.query(fetchProvidersQuery);
    return result.rows; // Ensure the function returns a value
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error; // Rethrow the error for higher-level handling
  }
};
