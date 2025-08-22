import { test, expect } from "vitest";
import supertest from "supertest";
import { server } from "../app";
import { makeCourse } from "../tests/factories/make-course";

test("get course by id", async () => {
  await server.ready();

  const course = await makeCourse();

  const response = await supertest(server.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
    },
  });
});

test("return 404 for non existing course", async () => {
  await server.ready();

  const repsonse = await supertest(server.server).get(
    `/courses/7743b257-ac36-4962-aff8-f14cd569a6cf`,
  );

  expect(repsonse.status).toEqual(404);
});
