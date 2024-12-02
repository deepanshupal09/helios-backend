import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { initializeSocket } from "./socket";
import { pool, testDatabaseConnection } from "./config/db"; // Updated import for pg setup
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import solarRoutes from "./routes/solarRoutes"
import cron from "node-cron";


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
initializeSocket(server); // Initialize Socket.IO with the server

// Database and Server Initialization
const startServer = async () => {
  try {
    // Test database connection
    await testDatabaseConnection();

    server.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

// Define API routes
app.use("/api/user/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/dashboard/", dashboardRoutes);
app.use("/api/solar/", solarRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

// const fetchAndPopulateConsumption = async ():Promise<any> => {

// }

// const fetchAndPopulateSolarData = async ():Promise<any> => {

// }

// const fetchAndPopulateTariffData = async ():Promise<any> => {

// }

// cron.schedule("0 * * * *", async () => {
//   console.log("Cron job started at:", new Date().toISOString());
//   try {
//     // do the task

//     await Promise.all([
//       fetchAndPopulateConsumption(),
//       fetchAndPopulateSolarData(),
//       fetchAndPopulateTariffData()
//     ])
//     console.log("All data updated ssuccessffuullyy!");
//   } catch (error) {
//     console.error("Error during cron job execution:", error);
//   }
// });

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  try {
    await pool.end(); // Close pg pool connections
    console.log("Database connections closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});
