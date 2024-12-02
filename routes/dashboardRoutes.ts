import { Router } from "express";
import { fetchConsumptionController, fetchCurrentDataController, fetchSolarUsageController, fetchTariffRatesController } from "../controllers/dashboardController";

const router = Router();

// Route for the GET API
router.get("/fetch-consumption", fetchConsumptionController);
router.get("/fetch-tariff", fetchTariffRatesController);
router.get("/fetch-solar", fetchSolarUsageController);
router.get("/fetch-data", fetchCurrentDataController);

export default router;
