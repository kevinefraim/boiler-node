import { NextFunction, Request, Response } from "express";

import { Errors } from "@/entities/Errors";
import { AppDataSource } from "@/ormconfig";

const dotenv = require('dotenv-override').config({ override: true });

export const safe =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      res.status(err?.status || 400).json({
        message: err?.message || err?.msg || err,
        code: err?.codeError || 0,
        descri: err?.descriError || '',
      });

      next(err);
    }
  };

export class Exception extends Error {
  status: number = 400;
  codeError: number = 0;
  descriError: string = '';
  constructor(
    msg: string,
    status: number = 400,
    codeError?: number,
    descriError?: string,
  ) {
    super();
    this.status = status || 400;
    this.message = msg;
    this.codeError = codeError || 0;
    this.descriError = descriError || '';
  }
}

export const fetchError = async (code: number) => {
  try {
    return await AppDataSource.manager.findOne(Errors, {
      where: { code },
    });
  } catch (error) {
    return null;
  }
};

export const customError = async (msg: string, code: number) => {
  const error = await fetchError(code);
  return new Exception(msg, error?.status || 406, error?.code, error?.descri);
};
