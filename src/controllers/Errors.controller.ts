import { Errors } from "entities";
import { Request, Response } from "express";
import { AppDataSource } from "ormconfig";
import { customError } from "utils/helpers";

const errorsRepo = AppDataSource.getRepository(Errors);

export const getErrors = async (
  req: Request,
  res: Response,
): Promise<Response> => res.json(await errorsRepo.find());
