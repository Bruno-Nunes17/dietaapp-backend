import { FastifyRequest, FastifyReply } from "fastify";

class TestController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    reply.send({
        "data": {
          "nome": "Fulana",
          "sexo": "feminino",
          "idade": 20,
          "altura": 170,
          "peso": 47,
          "objetivo": "Definição",
          "refeicoes": [
            {
              "horario": "07:00",
              "nome": "Café da Manhã",
              "alimentos": [
                "2 ovos inteiros",
                "1 fatia de pão integral",
                "1/2 abacate"
              ]
            },
            {
              "horario": "10:00",
              "nome": "Lanche da Manhã",
              "alimentos": [
                "1 maçã com 1 colher de sopa de manteiga de amendoim"
              ]
            },
            {
              "horario": "13:00",
              "nome": "Almoço",
              "alimentos": [
                "120g de peito de frango grelhado",
                "1 xícara de arroz integral",
                "1/2 xícara de brócolis cozido"
              ]
            },
            {
              "horario": "16:00",
              "nome": "Lanche da Tarde",
              "alimentos": [
                "1 barra de proteína (20g)"
              ]
            },
            {
              "horario": "19:00",
              "nome": "Jantar",
              "alimentos": [
                "150g de salmão assado",
                "1/2 xícara de quinoa",
                "1 xícara de espinafre refogado"
              ]
            },
            {
              "horario": "21:00",
              "nome": "Ceia",
              "alimentos": [
                "1 xícara de iogurte natural",
                "1/4 xícara de frutas vermelhas"
              ]
            }
          ],
          "suplementos": [
            {
              "nome": "Whey Protein",
              "dosagem": "2 scoops por dia"
            },
            {
              "nome": "Creatina",
              "dosagem": "5g por dia"
            }
          ]
        }
      });
  }
}

export { TestController };
