import { useState, useEffect, useCallback } from "react";
import { EstadoFazenda } from "../engine/GameEngine";
import { criarFazenda, obterFazenda, plantar, colher, comprarItem } from "../api/farmApi";

const CHAVE_STORAGE = "schrute_fazenda_id";

interface UseFazendaRetorno {
  fazenda: EstadoFazenda | null;
  carregando: boolean;
  erro: string | null;
  pontosPersonalidade: number;
  iniciarFazenda: (nome: string, ppInicial?: number) => Promise<void>;
  plantarParcela: (parcelaId: number) => Promise<void>;
  colherParcela: (parcelaId: number) => Promise<void>;
  comprarNaLoja: (itemId: string) => Promise<void>;
  sincronizar: () => Promise<void>;
  abandonarFazenda: () => void;
}

export function useFazenda(): UseFazendaRetorno {
  const [fazenda, setFazenda] = useState<EstadoFazenda | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pontosPersonalidade, setPontosPersonalidade] = useState(0);

  const sincronizar = useCallback(async () => {
    const id = localStorage.getItem(CHAVE_STORAGE);
    if (!id) return;
    try {
      const dados = await obterFazenda(id);
      setFazenda(dados);
    } catch {
      setErro("Nao foi possivel sincronizar com o servidor.");
    }
  }, []);

  useEffect(() => {
    sincronizar();
    const intervalo = setInterval(sincronizar, 5000);
    return () => clearInterval(intervalo);
  }, [sincronizar]);

  const iniciarFazenda = async (nome: string, ppInicial = 0) => {
    setCarregando(true);
    setErro(null);
    try {
      const nova = await criarFazenda(nome);
      localStorage.setItem(CHAVE_STORAGE, nova.fazendaId);
      setPontosPersonalidade(ppInicial);
      setFazenda(nova);
    } catch (e) {
      setErro(String(e));
    } finally {
      setCarregando(false);
    }
  };

  const plantarParcela = async (parcelaId: number) => {
    if (!fazenda) return;
    setErro(null);
    try {
      const atualizado = await plantar(fazenda.fazendaId, parcelaId);
      setFazenda(atualizado);
    } catch (e) {
      setErro(String(e));
    }
  };

  const colherParcela = async (parcelaId: number) => {
    if (!fazenda) return;
    setErro(null);
    try {
      const atualizado = await colher(fazenda.fazendaId, parcelaId);
      setFazenda(atualizado);
    } catch (e) {
      setErro(String(e));
    }
  };

  const comprarNaLoja = async (itemId: string) => {
    if (!fazenda) return;
    setErro(null);
    try {
      const atualizado = await comprarItem(fazenda.fazendaId, itemId);
      setFazenda(atualizado);
    } catch (e) {
      setErro(String(e));
    }
  };

  const abandonarFazenda = () => {
    localStorage.removeItem(CHAVE_STORAGE);
    setFazenda(null);
    setErro(null);
    setPontosPersonalidade(0);
  };

  return { fazenda, carregando, erro, pontosPersonalidade, iniciarFazenda, plantarParcela, colherParcela, comprarNaLoja, sincronizar, abandonarFazenda };
}
