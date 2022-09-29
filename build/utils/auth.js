"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwt = exports.comparePass = exports.cryptPass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require('dotenv-override').config({ override: true });
const cryptPass = (password) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
};
exports.cryptPass = cryptPass;
const comparePass = (reqPass, userPass) => {
    return bcrypt_1.default.compareSync(reqPass, userPass);
};
exports.comparePass = comparePass;
const createJwt = (user) => {
    return new Promise((resolve, reject) => {
        const payload = { user };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '2h',
        }, (error, token) => {
            if (error) {
                console.warn(error);
                reject('Token did not generate');
            }
            resolve(token);
        });
    });
};
exports.createJwt = createJwt;
