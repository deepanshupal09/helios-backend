import { Router } from "express";
import { fetchConsumptionController, fetchLinkedDeviceConsumption, fetchCurrentDataController, fetchSolarUsageController, fetchTariffRatesController } from "../controllers/dashboardController";

const router = Router();

// Route for the GET API
router.get("/fetch-consumption", fetchConsumptionController);
router.get("/fetch-tariff", fetchTariffRatesController);
router.get("/fetch-solar", fetchSolarUsageController);
router.get("/fetch-data", fetchCurrentDataController);
router.get("/fetchLinkedDeviceConsumption", fetchLinkedDeviceConsumption)

export default router;
