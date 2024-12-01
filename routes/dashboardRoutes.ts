import { Router } from "express";
import { fetchConsumptionController, fetchTariffRatesController } from "../controllers/dashboardController";

const router = Router();

// Route for the GET API
router.get("/fetch-consumption", fetchConsumptionController);
router.get("/fetch-tariff", fetchTariffRatesController);

export default router;
