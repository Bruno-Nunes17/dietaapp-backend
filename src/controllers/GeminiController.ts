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
    const { name, gender, weight, height, age, goal, level, foods, meals } =
      request.body as GeminiProps;

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

    reply.send(order);
  }
  async training(request: FastifyRequest, reply: FastifyReply) {
    const { name, gender, weight, height, age, goal, level, workoutSplit,
      experience,
      workoutDuration,
      limitations,
      extraActivities } =
      request.body as GeminiProps;

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

    reply.send(order);
  }

  async mixed(request: FastifyRequest, reply: FastifyReply) {
    const { name, gender, weight, height, age, goal, level, foods, meals, workoutSplit,
      experience,
      workoutDuration,
      limitations,
      extraActivities } =
      request.body as GeminiProps;

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

    reply.send({ nutrition: nutritionOrder?.data, training: trainingOrder?.data });
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
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

    reply.send(order);
  }

}

export { GeminiController };
