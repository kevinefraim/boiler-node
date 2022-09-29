"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerErrors = void 0;
const Errors_controller_1 = require("controllers/Errors.controller");
const express_1 = require("express");
const helpers_1 = require("utils/helpers");
exports.routerErrors = (0, express_1.Router)();
exports.routerErrors.get('/api/v1/errors', (0, helpers_1.safe)(Errors_controller_1.getErrors));
