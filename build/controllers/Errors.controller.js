"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrors = void 0;
const entities_1 = require("entities");
const ormconfig_1 = require("ormconfig");
const errorsRepo = ormconfig_1.AppDataSource.getRepository(entities_1.Errors);
const getErrors = async (req, res) => res.json(await errorsRepo.find());
exports.getErrors = getErrors;
