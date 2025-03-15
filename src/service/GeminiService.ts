import { GeminiProps } from "../controllers/GeminiController";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

class GeminiService {
  async execute({
    name,
    gender,
    weight,
    height,
    age,
    objective,
    level,
  }: GeminiProps) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição em horas, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento. exemplo de como deve ser retornado: 
      {
		"nome": ${name},
		"sexo": ${gender},
		"idade": ${age},
		"altura": ${height},
		"peso": ${weight},
		"objetivo": ${objective},
		"refeicoes": [
			{
				"horario": "00:00",
				"nome": "",
				"alimentos": [
					"",
				]
		],
		"suplementos": [
			{
				"nome": "",
				"dosagem": ""
			}
		]
}`;

      const result = await model.generateContent(prompt);

      if (result.response && result.response.candidates) {
        const jsonText = result.response.candidates[0]?.content.parts[0]
          .text as string;

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { GeminiService };
