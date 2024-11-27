import { Router } from "express";
import { fetchConsumption } from "../controllers/userController";

const router = Router();

router.get("/", (req,res)=>{res.send("hello")})
router.get("/fetchConsumption", fetchConsumption)

export default router;
