import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { createCourseRoute } from "./routes/create-course";
import { getCoursesRoute } from "./routes/get-courses";
import { getCourseByIdRoute } from "./routes/get-course-id";
import scalarAPIReference from "@scalar/fastify-api-reference";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Challenger Node.js",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
  });
}

server.register(createCourseRoute);
server.register(getCoursesRoute);
server.register(getCourseByIdRoute);

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

export { server };
