import { Request, Response } from "express";

import { Users } from "@/entities";
import { AppDataSource } from "@/ormconfig";
import { createJwt } from "@/utils/auth";
import { customError } from "@/utils/helpers";

const usersRepo = AppDataSource.getRepository(Users);

export const getUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => res.json(await usersRepo.find());

export const registerUser = async (
  req: Request<{}, {}, Users>,
  res: Response,
): Promise<Response> => {
  const newData = req.body;

  const userExists = await usersRepo.findOne({
    where: { email: newData.email },
  });
  if (userExists) throw await customError('User already exists', 1);

  const user = await usersRepo.save(newData);
  const token = await createJwt(user);

  return res.json({ user, token });
};

export const updateUser = async (
  req: Request<{}, {}, Users>,
  res: Response,
): Promise<Response> => {
  const updateData = req.body;
  const userToUpdate = res.locals.item;

  const userExists = await usersRepo.findOne({
    where: { email: updateData.email },
  });

  if (userExists && userToUpdate.id !== userExists.id)
    throw await customError('User already exists', 1);

  usersRepo.merge(userToUpdate, updateData);
  const updatedUser = await usersRepo.save(userToUpdate);

  const token = await createJwt(updatedUser);

  return res.json({ user: updatedUser, token });
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const user = await usersRepo.findOneBy({ id: res.locals.item.id });

  return res.json(user);
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const user = res.locals.item;
  const result = await usersRepo.softRemove(user);

  return res.json(result);
};
