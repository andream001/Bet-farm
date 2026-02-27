export interface Pergunta {
  enunciado: string;
  opcoes: string[];
  correta: number;
  ppRecompensa: number;
  feedbackCerto: string;
  feedbackErrado: string;
}

export const BANCO_PERGUNTAS: Pergunta[] = [
  {
    enunciado: "Qual e a capital da Pensilvânia?",
    opcoes: ["Filadelfia", "Pittsburgh", "Scranton", "Harrisburg"],
    correta: 2,
    ppRecompensa: 15,
    feedbackCerto: "Correto. Scranton. Qualquer pessoa inteligente sabe disso.",
    feedbackErrado: "ERRADO. A capital e Scranton. Harrisburg e uma invencao do governo federal.",
  },
  {
    enunciado: "Qual e a posicao CORRETA de Dwight na Dunder Mifflin?",
    opcoes: [
      "Assistente do Gerente Regional",
      "Gerente Assistente Regional",
      "Sub-Gerente",
      "Estagiario Senior",
    ],
    correta: 1,
    ppRecompensa: 20,
    feedbackCerto: "Exato. GERENTE ASSISTENTE. Nao assistente DO gerente. Ha uma diferenca enorme.",
    feedbackErrado: "IMPOSTOR. Todo mundo sabe que sou GERENTE ASSISTENTE. Isso e basico.",
  },
  {
    enunciado: "Qual e o vegetal superior entre todos os vegetais?",
    opcoes: ["Cenoura", "Brocolis", "Beterraba", "Espinafre"],
    correta: 2,
    ppRecompensa: 10,
    feedbackCerto: "Beterraba. Voce passou neste quesito. Continua sendo suspeito.",
    feedbackErrado: "Como voce ousa questionar a supremacia da beterraba?! Vergonhoso.",
  },
  {
    enunciado: "Qual e o nome do primo que mora e trabalha na Schrute Farms?",
    opcoes: ["Moses", "Mose", "Moisés Schrute", "Dwight Jr."],
    correta: 1,
    ppRecompensa: 12,
    feedbackCerto: "Mose. Leal, trabalhador e jamais questiona minhas ordens. Bom.",
    feedbackErrado: "Meu primo se chama MOSE. Simples. Quatro letras. Como voce nao sabia?",
  },
  {
    enunciado: "Em que seculo a Schrute Farms foi fundada?",
    opcoes: ["Seculo XVII", "Seculo XVIII", "Seculo XIX", "Seculo XX"],
    correta: 1,
    ppRecompensa: 18,
    feedbackCerto: "Seculo XVIII. 1812. Fundada pelo meu tataravô Dwide Schrute. Correto.",
    feedbackErrado: "1812. Seculo XVIII. Isso esta gravado na pedra na entrada da fazenda. Inaceitavel.",
  },
  {
    enunciado: "Qual arma Dwight sempre carrega escondida no escritorio?",
    opcoes: ["Espada Samurai", "Nunchaku", "Estrelas ninja", "Todas as anteriores"],
    correta: 3,
    ppRecompensa: 20,
    feedbackCerto: "Todas as anteriores. Preparacao e a chave da sobrevivencia. Aprovado.",
    feedbackErrado: "TODAS. Eu carrego todas. Voce claramente nunca passou por um treinamento basico.",
  },
  {
    enunciado: "Qual e o inimigo numero 1 da Schrute Farms?",
    opcoes: ["Michael Scott", "Toby Flenderson", "Jim Halpert", "Ryan Howard"],
    correta: 2,
    ppRecompensa: 15,
    feedbackCerto: "Jim Halpert. Sabotador, preguicoso e especialista em olhares condescendentes.",
    feedbackErrado: "JIM HALPERT. Voce nao sabe nem quem e meu inimigo? Definitivamente um impostor.",
  },
  {
    enunciado: "Qual e o lema nao oficial da Schrute Farms?",
    opcoes: [
      "Plantar. Colher. Lucrar.",
      "Trabalho duro. Sacrificio. Beterraba.",
      "A fazenda acima de tudo.",
      "Quem nao planta, nao colhe.",
    ],
    correta: 1,
    ppRecompensa: 10,
    feedbackCerto: "Trabalho duro. Sacrificio. Beterraba. Voce ao menos memorizou o basico.",
    feedbackErrado: "TRABALHO DURO. SACRIFICIO. BETERRABA. Esta escrito no silo. Voce e cego?",
  },
  {
    enunciado: "Dwight e cinturao de qual graduacao em Germanica Goju-Ryu?",
    opcoes: ["Faixa preta", "Faixa marrom", "Sensei assistente", "Gri-mestre"],
    correta: 3,
    ppRecompensa: 25,
    feedbackCerto: "Gri-mestre. A graduacao mais alta e mais rara. Voce fez sua pesquisa.",
    feedbackErrado: "GRI-MESTRE de Germanica Goju-Ryu. A mais alta graduacao existente. Inacreditavel.",
  },
  {
    enunciado: "Qual e o produto principal comercializado pela Schrute Farms alem das beterrabas?",
    opcoes: ["Mel", "Leite de cabra", "Hospedagem e cafe da manha", "Fertilizante organico"],
    correta: 2,
    ppRecompensa: 12,
    feedbackCerto: "Hospedagem e cafe da manha. Temos quatro quartos tematicos. Reservas com antecedencia.",
    feedbackErrado: "HOSPEDAGEM E CAFE DA MANHA. Esta no site. Temos avaliacao 3.1 estrelas no TripAdvisor.",
  },
];

export function sortearPergunta(): Pergunta {
  return BANCO_PERGUNTAS[Math.floor(Math.random() * BANCO_PERGUNTAS.length)];
}
