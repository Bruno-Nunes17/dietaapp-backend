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

      const {
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
        foods,
        meals,
      } = request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const order = await GeminiResponse.nutrition({
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
        foods,
        meals,
      });

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

      const {
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
        workoutSplit,
        experience,
        workoutDuration,
        limitations,
        extraActivities,
      } = request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const order = await GeminiResponse.training({
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
        workoutSplit,
        experience,
        workoutDuration,
        limitations,
        extraActivities,
      });

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

      const {
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
        foods,
        meals,
        workoutSplit,
        experience,
        workoutDuration,
        limitations,
        extraActivities,
      } = request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const nutritionOrder = await GeminiResponse.nutrition({
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
        foods,
        meals,
      });
      const trainingOrder = await GeminiResponse.training({
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
        workoutSplit,
        experience,
        workoutDuration,
        limitations,
        extraActivities,
      });

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

      const { name, gender, weight, height, age, goal, level } =
        request.body as GeminiProps;

      const GeminiResponse = new GeminiService();
      const order = await GeminiResponse.execute({
        name,
        gender,
        weight,
        height,
        age,
        goal,
        level,
      });

      console.log("handle end:", Date.now() - start, "ms");
      reply.send(order);
    } catch (error) {
      console.error("handle error:", error);
      reply.status(500).send({ error: "Erro interno no processamento" });
    }
  }
}

export { GeminiController };
