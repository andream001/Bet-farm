export interface VarianteDwight {
  variantes: string[];
  ppBase: number;
  saudacao: string;
}

export const VARIANTES_DWIGHT: VarianteDwight[] = [
  {
    variantes: ["dwight kurt schrute"],
    ppBase: 15,
    saudacao: "Nome completo detectado. Respeito maximo concedido.",
  },
  {
    variantes: ["dwight k. schrute", "dwight k schrute"],
    ppBase: 10,
    saudacao: "Inicial do nome do meio presente. Aprovado, parcialmente.",
  },
  {
    variantes: ["dwight schrute"],
    ppBase: 7,
    saudacao: "Nome reconhecido. Verificacao necessaria.",
  },
  {
    variantes: ["gerente assistente", "assistant regional manager"],
    ppBase: 8,
    saudacao: "Titulo oficial detectado. Identidade a confirmar.",
  },
  {
    variantes: ["mose schrute", "mose"],
    ppBase: 5,
    saudacao: "Primo leal identificado. Acesso liberado sem interrogatorio.",
  },
  {
    variantes: ["d.k.s.", "dks"],
    ppBase: 5,
    saudacao: "Iniciais suspeitas. Preciso de mais informacoes.",
  },
  {
    variantes: ["dwight"],
    ppBase: 3,
    saudacao: "Apenas primeiro nome. Pode ser qualquer Dwight. Identifique-se.",
  },
];

export const TITULOS_PP: { minPP: number; titulo: string }[] = [
  { minPP: 100, titulo: "Dwight K. Schrute" },
  { minPP: 50,  titulo: "Assistant Regional Manager" },
  { minPP: 25,  titulo: "Gerente Assistente" },
  { minPP: 10,  titulo: "Assistente do Fazendeiro" },
  { minPP: 0,   titulo: "Fazendeiro Comum" },
];

export function detectarVarianteDwight(nome: string): VarianteDwight | null {
  const normalizado = nome.trim().toLowerCase();
  // Mose nao precisa de verificacao — retorna direto com flag especial
  return (
    VARIANTES_DWIGHT.find((v) =>
      v.variantes.some((s) => normalizado === s || normalizado.includes(s))
    ) ?? null
  );
}

export function ehMose(nome: string): boolean {
  const n = nome.trim().toLowerCase();
  return n === "mose" || n === "mose schrute";
}

export function tituloAtual(pp: number): string {
  return (
    TITULOS_PP.find((t) => pp >= t.minPP)?.titulo ?? "Fazendeiro Comum"
  );
}
