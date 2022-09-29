"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customError = exports.fetchError = exports.Exception = exports.safe = void 0;
const Errors_1 = require("entities/Errors");
const services_1 = require("services");
const dotenv = require('dotenv-override').config({ override: true });
const safe = (fn) => async (req, res, next) => {
    try {
        await fn(req, res);
    }
    catch (err) {
        res.status((err === null || err === void 0 ? void 0 : err.status) || 400).json({
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.msg) || err,
            code: (err === null || err === void 0 ? void 0 : err.codeError) || 0,
            descri: (err === null || err === void 0 ? void 0 : err.descriError) || '',
        });
        next(err);
    }
};
exports.safe = safe;
class Exception extends Error {
    constructor(msg, status = 400, codeError, descriError) {
        super();
        this.status = 400;
        this.codeError = 0;
        this.descriError = '';
        this.status = status || 400;
        this.message = msg;
        this.codeError = codeError || 0;
        this.descriError = descriError || '';
    }
}
exports.Exception = Exception;
const fetchError = async (code) => {
    try {
        return await (0, services_1.findOne)(Errors_1.Errors, { where: { code } });
    }
    catch (error) {
        return null;
    }
};
exports.fetchError = fetchError;
const customError = async (msg, code) => {
    const error = await (0, exports.fetchError)(code);
    return new Exception(msg, (error === null || error === void 0 ? void 0 : error.status) || 406, error === null || error === void 0 ? void 0 : error.code, error === null || error === void 0 ? void 0 : error.descri);
};
exports.customError = customError;
