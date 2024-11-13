import express, { Request, Response } from "express";
import cors from "cors";


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

app.get("/", (req:Request,res:Response)=>{
    res.send("Server is running...");
})