import { useRef, useEffect, useState } from "react";
import {
  Parcela,
  desenharFazenda,
  parcelaPorClique,
  LINHAS,
  COLUNAS,
  TAMANHO_CELULA,
  MARGEM,
} from "../engine/GameEngine";

interface Props {
  parcelas: Parcela[];
  onPlantar: (id: number) => void;
  onColher: (id: number) => void;
}

const LARGURA = COLUNAS * (TAMANHO_CELULA + MARGEM) + MARGEM;
const ALTURA = LINHAS * (TAMANHO_CELULA + MARGEM) + MARGEM;

export function GameCanvas({ parcelas, onPlantar, onColher }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selecionada, setSelecionada] = useState<number | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    desenharFazenda(ctx, parcelas, selecionada);
  }, [parcelas, selecionada]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const id = parcelaPorClique(e.clientX, e.clientY, rect);
    if (id === null) return;
    setSelecionada(id);
    const parcela = parcelas[id];
    if (!parcela) return;
    if (parcela.estagio === "vazio") onPlantar(id);
    else if (parcela.estagio === "maduro") onColher(id);
  };

  return (
    <div className="canvas-wrapper">
      <div className="canvas-regua">
        <span>SCHRUTE FARMS — GRADE DE CULTIVO — {COLUNAS}×{LINHAS} PARCELAS</span>
      </div>
      <canvas
        ref={canvasRef}
        width={LARGURA}
        height={ALTURA}
        onClick={handleClick}
        className="canvas-jogo"
        title="Clique em uma parcela vazia para plantar ou em uma madura para colher"
      />
    </div>
  );
}
