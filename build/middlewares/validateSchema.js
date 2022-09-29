"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const helpers_1 = require("utils/helpers");
const zod_1 = require("zod");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const customError = await (0, helpers_1.fetchError)(3);
            return res.status(406).json({
                message: error.issues.flat().map(issue => issue.message),
                code: (customError === null || customError === void 0 ? void 0 : customError.code) || 0,
                descri: (customError === null || customError === void 0 ? void 0 : customError.descri) || '',
            });
        }
    }
};
exports.validateSchema = validateSchema;
