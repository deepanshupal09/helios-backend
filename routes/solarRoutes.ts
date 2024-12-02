import { Router } from "express";
import { fetchProviders, login, register } from "../controllers/authController";
import { fetchSolarProduction, fetchSolarYield, sellSolarEnergy, updateStatus } from "../controllers/solarController";


const router = Router();

router.get("/fetchSolarProduction", fetchSolarProduction)
router.post("/sellSolarEnergy", sellSolarEnergy)
router.get("/fetchSolarYield", fetchSolarYield)
router.post("/updateStatus", updateStatus)

export default router;
