import { Router } from "express";

import { getErrors } from "@/controllers/Errors.controller";
import { safe } from "@/utils/helpers";

export const routerErrors = Router();

routerErrors.get('/api/v1/errors', safe(getErrors));
