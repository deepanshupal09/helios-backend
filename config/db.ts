import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Configure the database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  ssl: {
    rejectUnauthorized: false, // Use only for Neon/serverless Postgres
  },
});

// Test database connection
const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connection has been established successfully.");
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
};

export { pool, testDatabaseConnection };
