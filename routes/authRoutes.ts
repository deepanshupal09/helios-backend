import { Router } from "express";
import { login, register } from "../controllers/authController";


const router = Router();

router.get("/", (req,res)=>{res.send("hello")})
router.get("/login", login)
router.post("/register", register)

export default router;
