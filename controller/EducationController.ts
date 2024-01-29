import { Request, Response } from "express";
import * as services from "../util/File";

async function GetAccountDetail(req: Request, res: Response) {
  const response = await services.GetEducationAccount(req);
  res.json(response);
}

async function AddEmployee(req: Request, res: Response) {
  const model = req.body;
  const response = await services.AddEdEmployee(req, model);
  res.json(response);
}

async function AddCompany(req: Request, res: Response) {
  const model = req.body;
  const response = await services.AddEdCompany(req, model);
  res.json(response);
}
export { GetAccountDetail, AddEmployee, AddCompany };
