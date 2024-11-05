import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { GeminiController } from "./controllers/GeminiController";
import { TestController } from "./controllers/TestController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new TestController().handle(request, reply);
    }
  );
  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GeminiController().handle(request, reply);
    }
  );
}
