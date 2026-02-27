export type EstagioPlanta = "vazio" | "plantado" | "crescendo" | "maduro" | "colhido";

export interface Parcela {
  id: number;
  estagio: EstagioPlanta;
  plantadoEm: number | null;
  maturacaoMs: number;
}

export interface EstadoFazenda {
  fazendaId: string;
  nomeFazendeiro: string;
  parcelas: Parcela[];
  beterrabas: number;
  pontos: number;
  schruteDolares: number;
  bonusPontosPorColheita: number;
  reducaoMaturacao: number;
  itensComprados: string[];
  criadoEm: number;
  atualizadoEm: number;
}

export const LINHAS = 4;
export const COLUNAS = 5;
export const TAMANHO_CELULA = 96;
export const MARGEM = 8;

export const COR_ESTAGIO: Record<EstagioPlanta, string> = {
  vazio:    "#8a6a3a",
  plantado: "#6B4423",
  crescendo:"#5a8a2a",
  maduro:   "#8B1A1A",
  colhido:  "#c8b030",
};

export const EMOJI_ESTAGIO: Record<EstagioPlanta, string> = {
  vazio: "",
  plantado: "??",
  crescendo: "??",
  maduro: "??",
  colhido: "?",
};

export const FRASES_DWIGHT = [
  "Beterraba. Urso. Battlestar Galactica.",
  "Identifique-se. Qual e o seu nome e sua fazenda?",
  "Nao ha tal coisa como uma beterraba ruim.",
  "Eu sou o fazendeiro mais eficiente do condado de Lackawanna.",
  "As beterrabas sao um vegetal superior.",
  "A colheita e uma bencao e uma responsabilidade.",
  "Plantei 400 acres de beterraba. Voce plantou quantos?",
  "Trabalho duro. Sacrificio. Beterraba.",
];

export function fraseAleatoria(): string {
  return FRASES_DWIGHT[Math.floor(Math.random() * FRASES_DWIGHT.length)];
}

export function desenharFazenda(
  ctx: CanvasRenderingContext2D,
  parcelas: Parcela[],
  parcelaSelecionada: number | null
): void {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  parcelas.forEach((p) => {
    const col = p.id % COLUNAS;
    const row = Math.floor(p.id / COLUNAS);
    const x = col * (TAMANHO_CELULA + MARGEM) + MARGEM;
    const y = row * (TAMANHO_CELULA + MARGEM) + MARGEM;

    ctx.fillStyle = COR_ESTAGIO[p.estagio];
    ctx.beginPath();
    ctx.roundRect(x, y, TAMANHO_CELULA, TAMANHO_CELULA, 8);
    ctx.fill();

    if (parcelaSelecionada === p.id) {
      ctx.strokeStyle = "#f5c518";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(x, y, TAMANHO_CELULA, TAMANHO_CELULA, 8);
      ctx.stroke();
    }

    const emoji = EMOJI_ESTAGIO[p.estagio];
    if (emoji) {
      ctx.font = "40px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(emoji, x + TAMANHO_CELULA / 2, y + TAMANHO_CELULA / 2);
    }

    ctx.fillStyle = "#3b1a08";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(`#${p.id}`, x + TAMANHO_CELULA / 2, y + TAMANHO_CELULA - 4);
  });
}

export function parcelaPorClique(
  clientX: number,
  clientY: number,
  rect: DOMRect
): number | null {
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const col = Math.floor(x / (TAMANHO_CELULA + MARGEM));
  const row = Math.floor(y / (TAMANHO_CELULA + MARGEM));
  if (col < 0 || col >= COLUNAS || row < 0 || row >= LINHAS) return null;
  return row * COLUNAS + col;
}
