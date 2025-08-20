import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { uuid, z } from "zod";
import { db } from "../database/client";
import { courses } from "../database/schema";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["Course"],
        summary: "Create a curse",
        body: z.object({
          title: z.string().min(5, "min length of title is 5 characters"),
          description: z.string(),
        }),
        response: {
          201: z.object({
            course: z.object({
              id: z.string().uuid(),
              title: z.string(),
              description: z.string(),
            }),
          }),
        },
      },
    },
    async (req, res) => {
      const body = req.body;

      const result = await db
        .insert(courses)
        .values({
          title: body.title,
          description: body.description,
        })
        .returning();

      return res.status(201).send({ course: result[0] });
    },
  );
};
