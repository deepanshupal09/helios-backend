import { Router } from "express";
import { fetchProviders, login, register } from "../controllers/authController";


const router = Router();

router.get("/", (req,res)=>{res.send("hello")})
router.get("/login", login)
router.post("/register", register)
router.get("/fetchProviders", fetchProviders)

export default router;
