import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client";
import { courses } from "../database/schema";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Course"],
        summary: "Show all courses registered",
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (req, res) => {
      const result = await db
        .select({
          id: courses.id,
          title: courses.title,
        })
        .from(courses);
        
      return res.send({ courses: result });
    },
  );
};