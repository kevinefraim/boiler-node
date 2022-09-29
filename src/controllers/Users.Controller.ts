import { Users } from "entities";
import { Request, Response } from "express";
import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  registerOneUser,
  updateOneUser
} from "services/Users.Services";

export const getUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => res.json(await getAllUsers());

export const registerUser = async (
  req: Request<{}, {}, Users>,
  res: Response,
): Promise<Response> => res.json(await registerOneUser(req.body));

export const updateUser = async (
  req: Request<{}, {}, Users>,
  res: Response,
): Promise<Response> =>
  res.json(await updateOneUser(res.locals.item, req.body));

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<Response> => res.json(await getOneUser(res.locals.item));

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => res.json(await deleteOneUser(res.locals.item));
