import { FastifyRequest, FastifyReply } from "fastify";
import { GeminiService } from "../service/GeminiService";

export interface GeminiProps {
  name: string;
  gender: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
  level: string;
  foods?: string;
  meals?: string;
  workoutSplit?: string;
  experience?: string;
  workoutDuration?: string;
  limitations?: string;
  extraActivities?: string;
}

class GeminiController {
  async nutrition(request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log("nutrition start");
      const start = Date.now();

      const props = request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const order = await GeminiResponse.nutrition(props);

      console.log("nutrition end:", Date.now() - start, "ms");
      reply.send(order);
    } catch (error) {
      console.error("nutrition error:", error);
      reply.status(500).send({ error: "Erro interno no processamento" });
    }
  }

  async training(request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log("training start");
      const start = Date.now();

      const props = request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const order = await GeminiResponse.training(props);

      console.log("training end:", Date.now() - start, "ms");
      reply.send(order);
    } catch (error) {
      console.error("training error:", error);
      reply.status(500).send({ error: "Erro interno no processamento" });
    }
  }

  async mixed(request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log("mixed start");
      const start = Date.now();

      const props = request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const nutritionOrder = await GeminiResponse.nutrition(props);
      const trainingOrder = await GeminiResponse.training(props);

      console.log("mixed end:", Date.now() - start, "ms");
      reply.send({ nutrition: nutritionOrder?.data, training: trainingOrder?.data });
    } catch (error) {
      console.error("mixed error:", error);
      reply.status(500).send({ error: "Erro interno no processamento" });
    }
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log("handle start");
      const start = Date.now();

      const props = request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const order = await GeminiResponse.execute(props);

      console.log("handle end:", Date.now() - start, "ms");
      reply.send(order);
    } catch (error) {
      console.error("handle error:", error);
      reply.status(500).send({ error: "Erro interno no processamento" });
    }
  }
}

export { GeminiController };
