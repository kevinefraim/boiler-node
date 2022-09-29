"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiKey = void 0;
const helpers_1 = require("utils/helpers");
const allowedPaths = ['confirm-user', 'paypal', 'stripe'];
const validateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers['api-key'];
        let allowPath = false;
        allowedPaths.forEach(path => {
            if (`${req.path}/`.startsWith(`/api/v1/${path}/`)) {
                return (allowPath = true);
            }
        });
        if (allowPath)
            return next();
        if (!apiKey)
            throw await (0, helpers_1.customError)('No api key provided', 6);
        if (apiKey !== process.env.API_KEY)
            throw await (0, helpers_1.customError)('Invalid API key', 6);
        next();
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.msg) || error,
            code: (error === null || error === void 0 ? void 0 : error.codeError) || 0,
            descri: (error === null || error === void 0 ? void 0 : error.descriError) || '',
        });
    }
};
exports.validateApiKey = validateApiKey;
