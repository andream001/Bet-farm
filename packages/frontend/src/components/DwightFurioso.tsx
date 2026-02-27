import { useEffect, useState } from "react";
import { NomeProibido, mensagemAleatoria } from "../data/nomesProibidos";

interface Props {
  nomeDigitado: string;
  dadosProibido: NomeProibido;
  onDispensa: () => void;
}

const ROSTO_DWIGHT = `
  ██████████████
 █  ▄  ██  ▄  █
██ (•) ██ (•) ██
 █  ▀▀▀██▀▀▀  █
 ██    ▄▄    ██
  █   ████   █
   █  ████  █
    █▄████▄█
      ████
   ███████████
  █  SCHRUTE  █
   ███████████`.trim();

export function DwightFurioso({ nomeDigitado, dadosProibido, onDispensa }: Props) {
  const [mensagem] = useState(mensagemAleatoria);
  const [segundos, setSegundos] = useState(8);
  const [tremendo, setTremendo] = useState(true);

  useEffect(() => {
    const tremor = setTimeout(() => setTremendo(false), 1200);
    return () => clearTimeout(tremor);
  }, []);

  useEffect(() => {
    if (segundos <= 0) return;
    const t = setInterval(() => setSegundos((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [segundos]);

  return (
    <div className="dwight-overlay" role="alertdialog" aria-modal="true">
      <div className={`dwight-caixa ${tremendo ? "dwight-tremor" : ""}`}>

        <pre className="dwight-rosto" aria-hidden="true">{ROSTO_DWIGHT}</pre>

        <div className="dwight-raiva-titulo">
          ⚠️ ACESSO NEGADO ⚠️
        </div>

        <p className="dwight-nome-rejeitado">
          "<span>{nomeDigitado}</span>" — NOME PROIBIDO
        </p>

        <p className="dwight-motivo-oficial">
          📋 Motivo oficial: {dadosProibido.motivo}
        </p>

        <p className="dwight-mensagem">{mensagem}</p>

        <div className="dwight-variantes">
          Variantes banidas:{" "}
          {dadosProibido.variantes.map((v, i) => (
            <span key={i} className="dwight-tag">{v}</span>
          ))}
        </div>

        <button
          className="dwight-btn-sair"
          onClick={onDispensa}
          disabled={segundos > 0}
        >
          {segundos > 0
            ? `Dwight te ignora por mais ${segundos}s...`
            : "Entendido. Escolherei outro nome."}
        </button>

        <p className="dwight-assinatura">
          — Dwight K. Schrute, Gerente Assistente, Schrute Farms
        </p>
      </div>
    </div>
  );
}
