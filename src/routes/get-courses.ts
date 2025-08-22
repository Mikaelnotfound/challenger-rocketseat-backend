import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client";
import { courses, enrollments } from "../database/schema";
import { and, asc, count, ilike, SQL } from "drizzle-orm";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Course"],
        summary: "Show all courses registered",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(["id", "title"]).optional().default("id"),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                enrollments: z.number(),
              }),
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (req, res) => {
      const { search, orderBy, page } = req.query;
      const limit = 10;

      const conditions: SQL[] = [];

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`));
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: courses.id,
            title: courses.title,
            enrollments: count(enrollments.id),
          })
          .from(courses)
          .where(and(...conditions))
          .orderBy(asc(courses[orderBy]))
          .offset((page - 1) * limit)
          .limit(limit)
          .groupBy(courses.id),
        db.$count(courses, and(...conditions)),
      ]);

      return res.send({ courses: result, total });
    },
  );
};
