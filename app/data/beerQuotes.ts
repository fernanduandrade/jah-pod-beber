export const beerQuotes = [
  "Cerveja: a causa e a solução de todos os problemas da vida.",
  "Uma cerveja gelada resolve 99% dos problemas. A outra porcentagem você resolve com mais duas.",
  "A vida é muito curta para beber cerveja ruim.",
  "Cerveja é prova de que Deus nos ama e quer que sejamos felizes.",
  "Não há problema que uma cerveja não possa resolver. E se houver, são duas.",
  "A felicidade é uma cerveja gelada na mão.",
  "Cerveja: porque não importa o dia, sempre é hora de tomar uma gelada.",
  "Uma cerveja por dia mantém a tristeza longe.",
  "Cerveja não é apenas uma bebida, é uma filosofia de vida.",
  "Se cerveja é a resposta, então a pergunta é: já pode beber?",
  "Cerveja é poesia líquida.",
  "A melhor cerveja é a que você está bebendo agora.",
  "Cerveja: a bebida que transforma segunda-feira em sexta-feira.",
  "Não existe problema que uma cerveja gelada não possa resolver. Pelo menos temporariamente.",
  "Cerveja é a resposta. Não me lembro qual era a pergunta, mas é a resposta.",
]

export function getRandomQuote(): string {
  return beerQuotes[Math.floor(Math.random() * beerQuotes.length)]
}
