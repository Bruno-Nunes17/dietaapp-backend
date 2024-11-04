import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { GeminiController } from "./controllers/GeminiController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { ok: true };
  });
  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GeminiController().handle(request, reply);
    }
  );
}
