// import { Request, Response } from "express";
// import { fetchConsumptionService } from "../service/userService";

// export const fetchConsumption = async (req: Request, res: Response) => {
//     const email = req.headers.email as string;
//     try {
//       const result = await fetchConsumptionService(email);
//       res.status(200).send(result);
//     } catch (error) {
//       res.status(500).send({ message: "Something went wrong, please try again!" });
//     }
//   };