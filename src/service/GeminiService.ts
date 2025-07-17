import { GeminiProps } from "../controllers/GeminiController";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

class GeminiService {
  async nutrition(props: GeminiProps) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Crie uma dieta completa e personalizada no formato JSON, com base nas informações a seguir:

- Nome: ${props.name}
- Sexo: ${props.gender}
- Peso: ${props.weight}kg
- Altura: ${props.height}
- Idade: ${props.age} anos
- Objetivo: ${props.goal}
- Nível de atividade física: ${props.level}
- Preferência alimentar: ${props.foods}
- Número de refeições diárias: ${props.meals}

⚠️ Regras importantes:
- Considere apenas as informações fornecidas acima.
- Não inclua observações, comentários ou explicações no retorno.
- As propriedades do JSON **não devem conter acentos**.
- Retorne o conteúdo **exclusivamente em JSON**, conforme o exemplo abaixo.
- Adicone emojis que tenham relação com alimentação assim como no exemplo.

📦 Formato esperado:
{
  "nome": "${props.name}",
  "sexo": "${props.gender}",
  "idade": ${props.age},
  "altura": ${props.height},
  "peso": ${props.weight},
  "objetivo": "${props.goal}",
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

      console.log("nutrition: enviando requisição para Google Generative AI");
      const result = await model.generateContent(prompt);
      console.log("nutrition: resposta recebida");

      if (result.response && result.response.candidates) {
        const jsonText = result.response.candidates[0]?.content.parts[0].text as string;

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      } else {
        throw new Error("Resposta inválida do modelo na nutrition");
      }
    } catch (error) {
      console.error("Erro na nutrition:", error);
      throw error;
    }
  }

  async training(props: GeminiProps) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Você é um especialista em educação física. Com base nas informações fornecidas, crie um plano de treino **completo e personalizado** no formato **JSON**.

📌 Informações do usuário:
- Nome: ${props.name}
- Sexo: ${props.gender}
- Peso: ${props.weight}kg
- Altura: ${props.height}cm
- Idade: ${props.age} anos
- Objetivo: ${props.goal}
- Nível de atividade física: ${props.level}
- Divisão de treino: ${props.workoutSplit}
- Experiência: ${props.experience}
- Duração da sessão: ${props.workoutDuration} minutos
- Limitações físicas: ${props.limitations || "nenhuma"}
- Atividades extras: ${props.extraActivities || "nenhuma"}

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
  "nome": "${props.name}",
  "sexo": "${props.gender}",
  "idade": ${props.age},
  "altura": ${props.height},
  "peso": ${props.weight},
  "objetivo": "${props.goal}",
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

      console.log("training: enviando requisição para Google Generative AI");
      const result = await model.generateContent(prompt);
      console.log("training: resposta recebida");

      if (result.response && result.response.candidates) {
        const jsonText = result.response.candidates[0]?.content.parts[0].text as string;

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      } else {
        throw new Error("Resposta inválida do modelo na training");
      }
    } catch (error) {
      console.error("Erro na training:", error);
      throw error;
    }
  }

  async execute(props: GeminiProps) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Crie uma dieta completa para uma pessoa com nome: ${props.name} do sexo ${props.gender} com peso atual: ${props.weight}kg, altura: ${props.height}, idade: ${props.age} anos e com foco e objetivo em ${props.goal}, atualmente nível de atividade: ${props.level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição em horas, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento. exemplo de como deve ser retornado: 
      {
    "nome": "${props.name}",
    "sexo": "${props.gender}",
    "idade": ${props.age},
    "altura": ${props.height},
    "peso": ${props.weight},
    "objetivo": "${props.goal}",
    "refeicoes": [
      {
        "horario": "00:00",
        "nome": "",
        "alimentos": [
          "",
        ]
      }
    ],
    "suplementos": [
      {
        "nome": "",
        "dosagem": ""
      }
    ]
}
`;

      console.log("execute: enviando requisição para Google Generative AI");
      const result = await model.generateContent(prompt);
      console.log("execute: resposta recebida");

      if (result.response && result.response.candidates) {
        const jsonText = result.response.candidates[0]?.content.parts[0].text as string;

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      } else {
        throw new Error("Resposta inválida do modelo na execute");
      }
    } catch (error) {
      console.error("Erro na execute:", error);
      throw error;
    }
  }
}

export { GeminiService };
