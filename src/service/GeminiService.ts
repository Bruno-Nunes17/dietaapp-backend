import { GeminiProps } from "../controllers/GeminiController";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

class GeminiService {
  async nutrition({
    name,
    gender,
    weight,
    height,
    age,
    goal,
    level,
    foods,
    meals,
  }: GeminiProps) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Crie uma dieta completa e personalizada no formato JSON, com base nas informações a seguir:

- Nome: ${name}
- Sexo: ${gender}
- Peso: ${weight}kg
- Altura: ${height}
- Idade: ${age} anos
- Objetivo: ${goal}
- Nível de atividade física: ${level}
- Preferência alimentar: ${foods}
- Número de refeições diárias: ${meals}

⚠️ Regras importantes:
- Considere apenas as informações fornecidas acima.
- Não inclua observações, comentários ou explicações no retorno.
- As propriedades do JSON **não devem conter acentos**.
- Retorne o conteúdo **exclusivamente em JSON**, conforme o exemplo abaixo.
- Adicone emojis que tenham relação com alimentação assim como no exemplo.

📦 Formato esperado:
{
  "nome": "${name}",
  "sexo": "${gender}",
  "idade": ${age},
  "altura": ${height},
  "peso": ${weight},
  "objetivo": "${goal}",
  "refeicoes": [
    {
        title: "🍳 Café da Manhã",
        items: [
            { food: "🥚 Ovos cozidos", quantity: "2 unidades" },
            { food: "🍞 Pão integral", quantity: "2 fatias" },
            { food: "🍌 Vitamina de banana com aveia", quantity: "300ml" },
        ],
    },
    ...
  ],
  "suplementos": [
    {
      "nome": "Nome do suplemento",
      "dosagem": "Dosagem recomendada"
    }
  ]
}
`;


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
  async training({
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
    extraActivities
  }: GeminiProps) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Você é um especialista em educação física. Com base nas informações fornecidas, crie um plano de treino **completo e personalizado** no formato **JSON**.

📌 Informações do usuário:
- Nome: ${name}
- Sexo: ${gender}
- Peso: ${weight}kg
- Altura: ${height}cm
- Idade: ${age} anos
- Objetivo: ${goal}
- Nível de atividade física: ${level}
- Divisão de treino: ${workoutSplit}
- Experiência: ${experience}
- Duração da sessão: ${workoutDuration} minutos
- Limitações físicas: ${limitations || "nenhuma"}
- Atividades extras: ${extraActivities || "nenhuma"}

⚠️ Instruções obrigatórias:
- Use **apenas** as informações acima.
- Retorne **exclusivamente JSON válido** (sem explicações, sem texto antes ou depois).
- **Não use acentos** nas chaves do JSON.
- Adicione **emojis relacionados ao exercício** nos títulos dos treinos e nos nomes dos exercícios.
- O plano deve ser dividido conforme a divisão de treino informada (ex: ABCD, AB, etc.).
- Seja coerente com o objetivo e o nível do usuário (por exemplo: volume, intensidade, descanso).
- Cada treino deve conter **mínimo 8 e máximo 12 exercícios**.
- Se o treino trabalhar mais de um grupo muscular (ex: peito e bíceps), divida os exercícios igualmente entre os grupos. Por exemplo, 4 exercícios para peito e 4 para bíceps.
- Use séries e repetições adequadas para o nível e objetivo do usuário.

📦 Formato esperado:
{
  "nome": "${name}",
  "sexo": "${gender}",
  "idade": ${age},
  "altura": ${height},
  "peso": ${weight},
  "objetivo": "${goal}",
  "workoutPlan": [
    {
      "title": "💪 Treino A - Peito e Triceps",
      "exercises": [
        {
          "name": "🏋️‍♂️ Supino Reto com Barra",
          "sets": 4,
          "reps": "8-10"
        },
        ...
      ]
    },
    ...
  ]
}
`;




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
  async execute({
    name,
    gender,
    weight,
    height,
    age,
    goal,
    level,
  }: GeminiProps) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${goal}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição em horas, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento. exemplo de como deve ser retornado: 
      {
		"nome": ${name},
		"sexo": ${gender},
		"idade": ${age},
		"altura": ${height},
		"peso": ${weight},
		"objetivo": ${goal},
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
