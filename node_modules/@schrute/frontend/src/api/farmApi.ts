import { EstadoFazenda } from "../engine/GameEngine";

const BASE = "/api/fazenda";

export async function criarFazenda(nomeFazendeiro: string): Promise<EstadoFazenda> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nomeFazendeiro }),
  });
  if (!res.ok) throw new Error("Falha ao criar fazenda");
  return res.json();
}

export async function obterFazenda(id: string): Promise<EstadoFazenda> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Fazenda nao encontrada");
  return res.json();
}

export async function plantar(id: string, parcelaId: number): Promise<EstadoFazenda> {
  const res = await fetch(`${BASE}/${id}/parcela/${parcelaId}/plantar`, { method: "POST" });
  if (!res.ok) throw new Error("Nao foi possivel plantar");
  return res.json();
}

export async function colher(id: string, parcelaId: number): Promise<EstadoFazenda> {
  const res = await fetch(`${BASE}/${id}/parcela/${parcelaId}/colher`, { method: "POST" });
  if (!res.ok) throw new Error("Beterraba ainda nao esta madura!");
  return res.json();
}

export async function comprarItem(id: string, itemId: string): Promise<EstadoFazenda> {
  const res = await fetch(`${BASE}/${id}/comprar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });
  if (!res.ok) {
    const dados = await res.json().catch(() => ({}));
    throw new Error((dados as { erro?: string }).erro ?? "Falha na compra");
  }
  return res.json();
}
