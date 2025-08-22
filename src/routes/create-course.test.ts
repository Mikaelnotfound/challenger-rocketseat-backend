import { test, expect } from "vitest";
import supertest from "supertest";
import { server } from "../app";
import { faker } from "@faker-js/faker";

test("create a course", async () => {
  await server.ready();

  const response = await supertest(server.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .send({ title: faker.lorem.words(4), description: faker.lorem.words(4) });

  expect(response.status).toEqual(201);
  expect(response.body).toMatchObject({
    course: {
      id: expect.any(String),
    },
  });
});
