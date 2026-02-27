export type CategoriaItem = "fazenda" | "especial";

export interface ItemLoja {
  id: string;
  nome: string;
  descricao: string;
  efeito: string;
  preco: number;
  emoji: string;
  categoria: CategoriaItem;
  unico: boolean;
}

export const CATALOGO: ItemLoja[] = [
  {
    id: "sementes_premium",
    nome: "Sementes Premium de Beterraba",
    descricao: "Cultivadas pelo proprio Dwight. Nao sao comuns.",
    efeito: "+5 pontos por colheita (permanente)",
    preco: 10,
    emoji: "🌱",
    categoria: "fazenda",
    unico: true,
  },
  {
    id: "irrigacao",
    nome: "Sistema de Irrigacao Schrute",
    descricao: "Regado manualmente pelo Mose. Maturacao 25% mais rapida.",
    efeito: "Maturacao -25% (permanente)",
    preco: 20,
    emoji: "💧",
    categoria: "fazenda",
    unico: true,
  },
  {
    id: "trator_mose",
    nome: "Trator do Mose",
    descricao: "Mose planta tudo agora. Ele nao faz perguntas.",
    efeito: "Planta todas as parcelas vazias de uma vez",
    preco: 35,
    emoji: "🚜",
    categoria: "fazenda",
    unico: false,
  },
  {
    id: "enxada_vovo",
    nome: "Enxada da Vovo Schrute",
    descricao: "Herdada da matriarca. Corta tudo que estiver maduro.",
    efeito: "Colhe todas as parcelas maduras de uma vez",
    preco: 40,
    emoji: "⛏️",
    categoria: "fazenda",
    unico: false,
  },
  {
    id: "remedio_mose",
    nome: "Remedio do Mose",
    descricao: "Feito na floresta. Efeito desconhecido. Pode ajudar. Pode nao ajudar.",
    efeito: "Efeito aleatorio — bom ou ruim",
    preco: 5,
    emoji: "💊",
    categoria: "especial",
    unico: false,
  },
];
