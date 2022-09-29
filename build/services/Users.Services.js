"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneUser = exports.getOneUser = exports.updateOneUser = exports.registerOneUser = exports.getAllUsers = void 0;
const entities_1 = require("entities");
const auth_1 = require("utils/auth");
const helpers_1 = require("utils/helpers");
const _1 = require("./");
const getAllUsers = async () => await (0, _1.findAll)(entities_1.Users);
exports.getAllUsers = getAllUsers;
const registerOneUser = async ({ email, firstName, lastName, }) => {
    const userExists = await (0, _1.findOne)(entities_1.Users, { where: { email } });
    if (userExists)
        throw await (0, helpers_1.customError)('User already exists', 1);
    const user = (await (0, _1.createOne)(entities_1.Users, {
        email,
        firstName,
        lastName,
    }));
    const token = (await (0, auth_1.createJwt)(user));
    return { user, token };
};
exports.registerOneUser = registerOneUser;
const updateOneUser = async (userToUpdate, updateData) => {
    const userExists = await (0, _1.findOne)(entities_1.Users, {
        where: { email: updateData.email },
    });
    if (userExists && userToUpdate.id !== userExists.id)
        throw await (0, helpers_1.customError)('User already exists', 1);
    await (0, _1.updateOne)(entities_1.Users, userToUpdate, updateData);
    const updatedUser = await (0, _1.findOne)(entities_1.Users, { where: { id: userToUpdate.id } });
    const token = await (0, auth_1.createJwt)(updateData);
    return { updatedUser, token };
};
exports.updateOneUser = updateOneUser;
const getOneUser = async (user) => await (0, _1.findOne)(entities_1.Users, { where: { id: user.id } });
exports.getOneUser = getOneUser;
const deleteOneUser = async (userToDelete) => await (0, _1.deleteOne)(entities_1.Users, userToDelete);
exports.deleteOneUser = deleteOneUser;
