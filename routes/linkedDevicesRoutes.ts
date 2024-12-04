import { Router } from "express";
import { fetchConsumtionDataController, fetchNotificationController } from "../controllers/linkedDevicesController";

const router = Router();

router.get("/fetch-consumption", fetchConsumtionDataController)
router.get("/fetch-notification", fetchNotificationController)


export default router;
