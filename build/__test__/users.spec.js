"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const ormconfig_1 = require("../ormconfig");
const PORT = process.env.PORT || '3001';
let connection, server;
beforeAll(async () => {
    connection = await (0, ormconfig_1.dbConnection)();
    server = app_1.default.listen(PORT);
});
afterAll(done => {
    connection.close();
    server.close();
    done();
});
describe('Users tests', () => {
    it('get users', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    });
});
