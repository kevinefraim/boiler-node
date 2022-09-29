import { Errors } from "entities";
import { Request, Response } from "express";
import { AppDataSource } from "ormconfig";

const errorsRepo = AppDataSource.getRepository(Errors);

export const getErrors = async (
  req: Request,
  res: Response,
): Promise<Response> => res.json(await errorsRepo.find());
