import { Errors } from "entities";

import { findAll } from "./";

export const getAllErrors = async () => await findAll(Errors);
