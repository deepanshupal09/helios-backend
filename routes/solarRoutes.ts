import { Router } from "express";
import { fetchProviders, login, register } from "../controllers/authController";
import { fetchBattery, fetchSolarProduction, fetchSolarYield, fetchStatus, sellSolarEnergy, updateBattery, updateStatus } from "../controllers/solarController";


const router = Router();

router.get("/fetchSolarProduction", fetchSolarProduction)
router.post("/sellSolarEnergy", sellSolarEnergy)
router.get("/fetchSolarYield", fetchSolarYield)
router.post("/updateStatus", updateStatus)
router.post("/updateBattery", updateBattery)
router.get("/fetchStatus", fetchStatus)
router.get("/fetchBattery", fetchBattery)


export default router;
