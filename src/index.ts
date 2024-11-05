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
    await app.listen({ port: 3333, host: "0.0.0.0"})
    console.log(`Servidor rodando no http://localhost:3333`)
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
