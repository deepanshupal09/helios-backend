import { Router } from "express";
import { fetchConsumtionDataController, sendNotification } from "../controllers/linkedDevicesController";

const router = Router();

router.get("/fetch-consumption", fetchConsumtionDataController)
router.post("/send-notification", sendNotification)


export default router;
