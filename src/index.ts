import fastify from "fastify";
import { routes } from "./routes";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(fastifyCors);
  await app.register(routes);

  const port = 3333;

  try {
    await app.listen({ port });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
