"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllErrors = void 0;
const entities_1 = require("entities");
const _1 = require("./");
const getAllErrors = async () => await (0, _1.findAll)(entities_1.Errors);
exports.getAllErrors = getAllErrors;
