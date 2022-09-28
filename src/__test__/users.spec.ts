import request from "supertest";

import app from "../app";
import { dbConnection } from "../ormconfig";

const PORT = process.env.PORT || '3001';

let connection: any, server: any;

beforeAll(async () => {
  connection = await dbConnection();
  server = app.listen(PORT);
});

afterAll(done => {
  connection.close();
  server.close();
  done();
});

describe('Users tests', () => {
  it('get users', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});
