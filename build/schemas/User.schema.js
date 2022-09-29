"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        invalid_type_error: 'Email should be a string',
        required_error: 'Email is required',
    })
        .min(1, { message: "Email can't be empty" }),
    firstName: zod_1.z
        .string({
        invalid_type_error: 'First Name should be a string',
        required_error: 'First Name is required',
    })
        .min(1, { message: "First Name can't be empty" }),
    lastName: zod_1.z
        .string({
        invalid_type_error: 'Last Name should be a string',
        required_error: 'Last Name is required',
    })
        .min(1, { message: "Last Name can't be empty" }),
});
