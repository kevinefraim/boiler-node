import { Router } from "express";

import {
  deleteUser,
  getUserById,
  getUsers,
  registerUser,
  updateUser
} from "@/controllers/Users.Controller";
import { Users } from "@/entities";
import { validateId, validateSchema } from "@/middlewares";
import { userSchema } from "@/schemas";
import { safe } from "@/utils/helpers";

export const routerUsers = Router();
const URL = '/api/v1/users';

routerUsers.get(URL, safe(getUsers));

routerUsers.get(`${URL}/:id`, validateId(Users), safe(getUserById));

routerUsers.post(
  '/api/v1/register',
  validateSchema(userSchema),
  safe(registerUser),
);

routerUsers.put(
  `${URL}/:id`,
  validateId(Users),
  validateSchema(userSchema),
  safe(updateUser),
);

routerUsers.delete(`${URL}/:id`, validateId(Users), safe(deleteUser));
