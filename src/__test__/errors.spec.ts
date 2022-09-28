import request from "supertest";

import app from "@/app";
import { dbConnection } from "@/ormconfig";

var PORT = process.env.PORT || '3001';

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

describe('Errors tests', () => {
  it('get errors', async () => {
    const response = await request(app).get('/api/v1/errors');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});
