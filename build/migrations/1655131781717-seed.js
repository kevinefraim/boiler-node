"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed1655131781717 = void 0;
const Errors_1 = require("../entities/Errors");
const Users_1 = require("../entities/Users");
const ormconfig_1 = require("../ormconfig");
const Errors_Seed_1 = require("../seeds/Errors.Seed");
const Users_Seed_1 = require("../seeds/Users.Seed");
class seed1655131781717 {
    async up(queryRunner) {
        const users = Users_Seed_1.UsersSeed;
        await ormconfig_1.AppDataSource.manager.save(Users_1.Users, users);
        await ormconfig_1.AppDataSource.manager.save(Errors_1.Errors, Errors_Seed_1.ErrorsSeed);
    }
    async down(queryRunner) {
        await ormconfig_1.AppDataSource.manager.delete(Errors_1.Errors, {
            code: [1, 2, 3, 4, 5, 6, 7],
        });
        await ormconfig_1.AppDataSource.manager.delete(Users_1.Users, {
            firstName: ['admin', 'active', 'inactive'],
        });
    }
}
exports.seed1655131781717 = seed1655131781717;
