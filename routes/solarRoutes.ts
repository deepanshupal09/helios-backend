import { Router } from "express";
import { fetchProviders, login, register } from "../controllers/authController";
import { fetchSolarProduction } from "../controllers/solarController";


const router = Router();

router.get("/fetchSolarProduction", fetchSolarProduction)

export default router;
