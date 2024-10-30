import { FastifyRequest, FastifyReply } from "fastify";
import { GeminiService } from "../services/GeminiService";

export interface GeminiProps {
  name: string;
  gender: string;
  weight: number;
  height: number;
  age: number;
  objective: string;
  level: string;
}

class GeminiController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, gender, weight, height, age, objective, level } =
      request.body as GeminiProps;

    const GeminiResponse = new GeminiService();
    const order = await GeminiResponse.execute({
      name,
      gender,
      weight,
      height,
      age,
      objective,
      level,
    });

    reply.send(order);
  }
}

export { GeminiController };
