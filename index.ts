import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { initializeSocket } from "./socket";
import { sequelize, testDatabaseConnection } from "./config/db";
import userRoutes from "./routes/userRoutes"
import authRoutes from "./routes/authRoutes"

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

    // Sync models (optional, be careful in production)
    await sequelize.sync({ alter: true });

    server.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

app.use("/api/user/", userRoutes);

app.use("/api/auth/",authRoutes)


app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});