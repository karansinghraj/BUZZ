import { Request, Response } from "express";
import { UserLogin } from "../services/LoginServices";

async function loginUser(req: Request, res: Response) {
  const model = req.body;
  const response = await UserLogin(model);
  res.json(response);
}

export { loginUser };
