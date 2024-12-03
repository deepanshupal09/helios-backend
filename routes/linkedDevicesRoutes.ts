import { Router } from "express";
import { fetchConsumtionDataController } from "../controllers/linkedDevicesController";

const router = Router();

router.get("/fetch-consumption", fetchConsumtionDataController)


export default router;
