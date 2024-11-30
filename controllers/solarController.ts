import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {

  try {
    
  } catch (error: any) {
    res.status(error.code).send({ message: error.message });
  }
};
