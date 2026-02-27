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

export const TEMPO_MATURACAO_MS = 15_000; // 15 segundos por beterraba
export const LINHAS = 4;
export const COLUNAS = 5;
export const TOTAL_PARCELAS = LINHAS * COLUNAS;

export function criarFazenda(id: string, nomeFazendeiro: string): EstadoFazenda {
  const parcelas: Parcela[] = Array.from({ length: TOTAL_PARCELAS }, (_, i) => ({
    id: i,
    estagio: "vazio",
    plantadoEm: null,
    maturacaoMs: TEMPO_MATURACAO_MS,
  }));
  return {
    fazendaId: id,
    nomeFazendeiro,
    parcelas,
    beterrabas: 0,
    pontos: 0,
    schruteDolares: 0,
    bonusPontosPorColheita: 0,
    reducaoMaturacao: 0,
    itensComprados: [],
    criadoEm: Date.now(),
    atualizadoEm: Date.now(),
  };
}

export function atualizarEstagios(fazenda: EstadoFazenda): EstadoFazenda {
  const agora = Date.now();
  fazenda.parcelas = fazenda.parcelas.map((p) => {
    if ((p.estagio === "plantado" || p.estagio === "crescendo") && p.plantadoEm !== null) {
      const decorrido = agora - p.plantadoEm;
      if (decorrido >= p.maturacaoMs) return { ...p, estagio: "maduro" };
      if (decorrido >= p.maturacaoMs / 2) return { ...p, estagio: "crescendo" };
    }
    return p;
  });
  fazenda.atualizadoEm = agora;
  return fazenda;
}
