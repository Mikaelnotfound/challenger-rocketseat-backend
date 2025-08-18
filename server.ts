import fastify from "fastify";
import crypto from "node:crypto";

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
});

const courses = [
  { id: "1", title: "Curso de sla oq" },
  { id: "2", title: "Curso de sla oq" },
  { id: "3", title: "Curso de sla oq" },
];

server.get("/courses", () => {
  return courses;
});

server.get("/users/:id", (req, res) => {
  type Params = {
    id: string;
  };

  const params = req.params as Params;
  const courseId = params.id;

  const course = courses.find((course) => course.id === courseId);
  if (course) {
    return course;
  }

  return res.status(404).send();
});

server.post("/couses", (req, res) => {
  type Body = {
    title: string;
  };

  const couseId = crypto.randomUUID();
  const body = req.body as Body;
  const courseTitle = body.title;
  courses.push({ id: couseId, title: courseTitle });

  return res.status(201).send({ couseId });
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
