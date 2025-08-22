import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../database/client";
import { courses } from "../database/schema";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      schema: {
        tags: ["Course"],
        summary: "Show course by specified id",
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            course: z.object({
              id: z.string().uuid(),
              title: z.string(),
              description: z.string(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const courseId = req.params.id;

      const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (result.length > 0) {
        return { course: result[0] };
      }

      return res.status(404).send({ message: "Course not found." });
    },
  );
};
