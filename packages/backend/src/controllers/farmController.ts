import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  EstadoFazenda,
  criarFazenda,
  atualizarEstagios,
} from "../models/farm";

const fazendas = new Map<string, EstadoFazenda>();

export function criarNovaFazenda(req: Request, res: Response): void {
  const { nomeFazendeiro } = req.body as { nomeFazendeiro?: string };
  if (!nomeFazendeiro) {
    res.status(400).json({ erro: "nomeFazendeiro e obrigatorio" });
    return;
  }
  const id = uuidv4();
  const fazenda = criarFazenda(id, nomeFazendeiro);
  fazendas.set(id, fazenda);
  res.status(201).json(fazenda);
}

export function obterFazenda(req: Request, res: Response): void {
  const fazenda = fazendas.get(req.params.id);
  if (!fazenda) {
    res.status(404).json({ erro: "Fazenda nao encontrada" });
    return;
  }
  res.json(atualizarEstagios(fazenda));
}

export function plantarParcela(req: Request, res: Response): void {
  const fazenda = fazendas.get(req.params.id);
  if (!fazenda) { res.status(404).json({ erro: "Fazenda nao encontrada" }); return; }
  const parcelaId = Number(req.params.parcelaId);
  const parcela = fazenda.parcelas[parcelaId];
  if (!parcela || parcela.estagio !== "vazio") {
    res.status(400).json({ erro: "Parcela indisponivel para plantio" });
    return;
  }
  parcela.estagio = "plantado";
  parcela.plantadoEm = Date.now();
  const maturacaoBase = parcela.maturacaoMs;
  parcela.maturacaoMs = Math.round(maturacaoBase * (1 - fazenda.reducaoMaturacao));
  fazenda.atualizadoEm = Date.now();
  res.json(atualizarEstagios(fazenda));
}

export function colherParcela(req: Request, res: Response): void {
  const fazenda = fazendas.get(req.params.id);
  if (!fazenda) { res.status(404).json({ erro: "Fazenda nao encontrada" }); return; }
  const parcelaId = Number(req.params.parcelaId);
  atualizarEstagios(fazenda);
  const parcela = fazenda.parcelas[parcelaId];
  if (!parcela || parcela.estagio !== "maduro") {
    res.status(400).json({ erro: "Parcela nao esta madura para colheita" });
    return;
  }
  parcela.estagio = "colhido";
  fazenda.beterrabas += 1;
  fazenda.pontos += 10 + fazenda.bonusPontosPorColheita;
  fazenda.schruteDolares += 5;
  fazenda.atualizadoEm = Date.now();
  setTimeout(() => {
    parcela.estagio = "vazio";
    parcela.plantadoEm = null;
    fazenda.atualizadoEm = Date.now();
  }, 2000);
  res.json(fazenda);
}

export function listarFazendas(_req: Request, res: Response): void {
  const lista = Array.from(fazendas.values()).map((f) => ({
    fazendaId: f.fazendaId,
    nomeFazendeiro: f.nomeFazendeiro,
    pontos: f.pontos,
    beterrabas: f.beterrabas,
  }));
  res.json(lista);
}

const ITENS: Record<string, (f: EstadoFazenda) => string | null> = {
  sementes_premium: (f) => {
    if (f.schruteDolares < 10) return "Schrute Dollars insuficientes";
    if (f.itensComprados.includes("sementes_premium")) return "Voce ja possui este item";
    f.schruteDolares -= 10;
    f.bonusPontosPorColheita += 5;
    f.itensComprados.push("sementes_premium");
    return null;
  },
  irrigacao: (f) => {
    if (f.schruteDolares < 20) return "Schrute Dollars insuficientes";
    if (f.itensComprados.includes("irrigacao")) return "Sistema ja instalado";
    f.schruteDolares -= 20;
    f.reducaoMaturacao = Math.min(f.reducaoMaturacao + 0.25, 0.75);
    f.itensComprados.push("irrigacao");
    return null;
  },
  trator_mose: (f) => {
    if (f.schruteDolares < 35) return "Schrute Dollars insuficientes";
    f.schruteDolares -= 35;
    atualizarEstagios(f);
    const agora = Date.now();
    f.parcelas.forEach((p) => {
      if (p.estagio === "vazio") {
        p.estagio = "plantado";
        p.plantadoEm = agora;
        p.maturacaoMs = Math.round(15000 * (1 - f.reducaoMaturacao));
      }
    });
    return null;
  },
  enxada_vovo: (f) => {
    if (f.schruteDolares < 40) return "Schrute Dollars insuficientes";
    f.schruteDolares -= 40;
    atualizarEstagios(f);
    f.parcelas.forEach((p) => {
      if (p.estagio === "maduro") {
        p.estagio = "colhido";
        f.beterrabas += 1;
        f.pontos += 10 + f.bonusPontosPorColheita;
        f.schruteDolares += 5;
        setTimeout(() => {
          p.estagio = "vazio";
          p.plantadoEm = null;
        }, 2000);
      }
    });
    return null;
  },
  remedio_mose: (f) => {
    if (f.schruteDolares < 5) return "Schrute Dollars insuficientes";
    f.schruteDolares -= 5;
    const efeitos = [
      () => { f.bonusPontosPorColheita += 3; },
      () => { f.schruteDolares += 15; },
      () => { f.pontos += 20; },
      () => { f.schruteDolares = Math.max(0, f.schruteDolares - 10); },
      () => { f.beterrabas += 2; },
    ];
    efeitos[Math.floor(Math.random() * efeitos.length)]();
    return null;
  },
};

export function comprarItem(req: Request, res: Response): void {
  const fazenda = fazendas.get(req.params.id);
  if (!fazenda) { res.status(404).json({ erro: "Fazenda nao encontrada" }); return; }
  const { itemId } = req.body as { itemId?: string };
  if (!itemId || !ITENS[itemId]) {
    res.status(400).json({ erro: "Item desconhecido" });
    return;
  }
  const erro = ITENS[itemId](fazenda);
  if (erro) { res.status(400).json({ erro }); return; }
  fazenda.atualizadoEm = Date.now();
  res.json(atualizarEstagios(fazenda));
}
