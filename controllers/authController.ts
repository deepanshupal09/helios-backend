import { Request, Response } from "express";
import { fetchProvidersService, loginService, registerService } from "../service/authService";

export const login = async (req: Request, res: Response) => {
  const email = req.headers.email as string;
  const password = req.headers.password as string;
  try {
    const result = await loginService(email, password);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(error.code).send({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  const user = req.body as UserType;
  try {
    const result = await registerService(user);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send({ message: "Something went wrong! Please try again later" });
  }
};

export const fetchProviders = async (req: Request, res: Response) => {
  try {
    const result = await fetchProvidersService();
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send({ message: "Something went wrong! Please try again later" });
  }
};
