import { getErrors } from "controllers/Errors.controller";
import { Router } from "express";
import { safe } from "utils/helpers";

export const routerErrors = Router();

routerErrors.get('/api/v1/errors', safe(getErrors));
