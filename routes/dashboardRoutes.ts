import { Router } from "express";
import { fetchConsumptionController } from "../controllers/dashboardController";

const router = Router();

// Route for the GET API
router.get("/fetch-consumption", fetchConsumptionController);

export default router;
