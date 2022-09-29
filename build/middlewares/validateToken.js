"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("utils/helpers");
const allowedPaths = [
    'adminLogin',
    'login',
    'register',
    'social',
    'stripe/webhook',
];
const validateToken = async (req, res, next) => {
    var _a, _b;
    try {
        let allowPath = false;
        allowedPaths.forEach(path => {
            if (`${req.path}/`.startsWith(`/api/v1/${path}/`)) {
                return (allowPath = true);
            }
        });
        if (allowPath)
            return next();
        const token = `${req.path}/`.startsWith('/api/v1/confirm-user/')
            ? req.params.token
            : (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token)
            throw await (0, helpers_1.customError)('No token provided', 6);
        const isRefreshToken = req.path === '/api/v1/refresh-token';
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_SEED, {
            ignoreExpiration: isRefreshToken,
        }, (err, decoded) => {
            if (err) {
                throw new helpers_1.Exception(`Wrong ${!isRefreshToken ? 'or expired ' : ''}token`, !isRefreshToken ? 401 : 410);
            }
            res.locals.user = decoded;
        });
        next();
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.msg) || error,
            code: (error === null || error === void 0 ? void 0 : error.status) === 410 ? 5 : 6 || 0,
            descri: (error === null || error === void 0 ? void 0 : error.status) === 410 ? 'Expired resource' : 'Unauthorized' || '',
        });
    }
};
exports.validateToken = validateToken;
