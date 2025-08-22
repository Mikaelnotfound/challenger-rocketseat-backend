import { test, expect } from "vitest";
import supertest from "supertest";
import { server } from "../app";
import { randomUUID } from "node:crypto";
import { makeCourse } from "../tests/factories/make-course";

test("create a course", async () => {
  await server.ready();

  const titleId = randomUUID();
  const course = await makeCourse(titleId);

  const response = await supertest(server.server).get(
    `/courses?search=${titleId}`,
  );

  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject({
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: expect.any(Number),
      },
    ],
    total: expect.any(Number),
  });
});
