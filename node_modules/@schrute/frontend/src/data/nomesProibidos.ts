export interface NomeProibido {
  variantes: string[];
  motivo: string;
}

export const NOMES_PROIBIDOS: NomeProibido[] = [
  {
    variantes: ["jim", "jimmy", "james", "james halpert", "halpert"],
    motivo: "Inimigo declarado da Schrute Farms desde 2005.",
  },
  {
    variantes: ["bill buttlicker", "buttlicker", "bill"],
    motivo: "Nome falso usado por Jim numa ligacao para me humilhar profissionalmente.",
  },
  {
    variantes: ["big tuna", "tuna"],
    motivo: "Apelido idiota inventado por Jim em Stamford. Inaceitavel.",
  },
  {
    variantes: ["asian jim", "asian"],
    motivo: "Jim contratou um impostor para fingir ser ele. Fraude documentada.",
  },
  {
    variantes: ["brian", "brian the cameraman"],
    motivo: "Ficou do lado de Jim. Banido permanentemente.",
  },
  {
    variantes: ["jimbo"],
    motivo: "Variante informal do inimigo. Igualmente proibida.",
  },
  {
    variantes: ["pam", "pamela", "pam beesly", "pam halpert"],
    motivo: "Conivente. Sempre do lado de Jim.",
  },
  {
    variantes: ["michael scott", "michael", "mike scott"],
    motivo: "Gerente incompetente que nunca me promoveu a gerente assistente OFICIAL.",
  },
  {
    variantes: ["robert california", "robert"],
    motivo: "CEO misterioso e perturbador. Nao confiavel.",
  },
  {
    variantes: ["andy bernard", "andy", "nard dog"],
    motivo: "Roubou minha posicao de gerente. Traidor da Cornell.",
  },
];

export const MENSAGENS_DWIGHT = [
  "IDENTIFICADO. Esse nome consta na Lista Negra Oficial da Schrute Farms. Acesso NEGADO.",
  "Voce realmente achou que eu nao teria uma lista? EU TENHO UMA LISTA. Seu nome esta nela.",
  "Isso e uma violacao direta do Codigo de Conduta da Schrute Farms, Artigo 4, Secao 12: Inimigos Declarados.",
  "Nao. Absolutamente nao. Nem em um universo alternativo eu deixaria esse nome entrar na minha fazenda.",
  "FALHA DE SEGURANCA DETECTADA. Protocolo anti-Jim ativado. Acesso bloqueado por tempo indeterminado.",
  "Eu treinei para esse momento. ANOS de preparacao. E voce pensou que ia passar.",
  "Como gerente assistente desta fazenda, tenho autoridade total para rejeitar esse nome. E e exatamente o que estou fazendo.",
  "Incrivel. A audacia. A falta de respeito. Acesso negado. Bom dia.",
];

export function ehNomeProibido(nome: string): NomeProibido | null {
  const normalizado = nome.trim().toLowerCase();
  return (
    NOMES_PROIBIDOS.find((p) =>
      p.variantes.some(
        (v) => normalizado === v || normalizado.includes(v)
      )
    ) ?? null
  );
}

export function mensagemAleatoria(): string {
  return MENSAGENS_DWIGHT[Math.floor(Math.random() * MENSAGENS_DWIGHT.length)];
}
