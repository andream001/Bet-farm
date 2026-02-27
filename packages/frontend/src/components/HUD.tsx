import { tituloAtual } from "../data/variantesDwight";
import { useTypewriter } from "../hooks/useTypewriter";

interface Props {
  nomeFazendeiro: string;
  beterrabas: number;
  pontos: number;
  schruteDolares: number;
  pontosPersonalidade: number;
  frase: string;
  onAbrirLoja: () => void;
}

export function HUD({ nomeFazendeiro, beterrabas, pontos, schruteDolares, pontosPersonalidade, frase, onAbrirLoja }: Props) {
  const titulo = tituloAtual(pontosPersonalidade);
  const { exibido, digitando } = useTypewriter(frase, 32);

  return (
    <div className="hud">
      <div className="hud-topo">
        <div className="hud-identidade">
          <span className="hud-nome">🌾 {nomeFazendeiro}</span>
          <span className="hud-titulo">{titulo}</span>
        </div>
        <div className="hud-stats">
          <span className="hud-stat hud-stat-sd" title="Schrute Dollars">
            💵 ${schruteDolares} <small>SD</small>
          </span>
          <span className="hud-stat" title="Beterrabas colhidas">🟥 {beterrabas}</span>
          <span className="hud-stat" title="Pontos">⭐ {pontos}</span>
          <span className="hud-stat hud-stat-pp" title="Pontos de Personalidade">
            🧠 {pontosPersonalidade} <small>PP</small>
          </span>
        </div>
        <button className="hud-btn-loja" onClick={onAbrirLoja}>
          🏪 LOJA
        </button>
      </div>
      <div className="hud-frase">
        {exibido}
        {digitando && <span className="typewriter-cursor" aria-hidden="true" />}
      </div>
    </div>
  );
}
