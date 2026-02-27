import { useEffect, useState } from "react";

interface Props {
  nomeFazendeiro: string;
  onVoltar: () => void;
}

const HUMILHACOES = [
  "Eu sabia. Sempre soube. Voce tem a postura de um impostor.",
  "Registrei sua tentativa. Arquivo I-247-B: Impostores da Schrute Farms.",
  "Jim me ensinou uma coisa: nunca confie em quem nao sabe o basico.",
  "Voce falhou na pergunta mais simples do protocolo. Constrangedor.",
  "Minha avo sabia mais sobre a fazenda do que voce. E ela morreu em 1987.",
  "Ja enviei seu perfil para o banco de dados de impostores do condado de Lackawanna.",
  "Nao e pessoal. E procedimento. Protocolo I-247-B secao 4 e claro nesse sentido.",
  "Voce tentou enganar Dwight K. Schrute. Isso nao termina bem para ninguem.",
];

const VEREDICTOS = [
  "IMPOSTOR CONFIRMADO",
  "IDENTIDADE REJEITADA",
  "FALHA NO PROTOCOLO",
  "ACESSO PERMANENTEMENTE NEGADO",
];

export function ImpostorDetectado({ nomeFazendeiro, onVoltar }: Props) {
  const [segundos, setSegundos] = useState(10);
  const [humilhacao] = useState(() => HUMILHACOES[Math.floor(Math.random() * HUMILHACOES.length)]);
  const [veredicto] = useState(() => VEREDICTOS[Math.floor(Math.random() * VEREDICTOS.length)]);

  useEffect(() => {
    if (segundos <= 0) return;
    const t = setInterval(() => setSegundos((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [segundos]);

  return (
    <div className="impostor-overlay">
      <div className="impostor-caixa">

        <div className="impostor-selo">☠️ {veredicto} ☠️</div>

        <pre className="impostor-fichario">{`
╔══════════════════════════════════════╗
║   FICHA DE IMPOSTOR — USO INTERNO   ║
╠══════════════════════════════════════╣
║ Nome declarado : ${nomeFazendeiro.padEnd(20).slice(0, 20)} ║
║ Status         : IMPOSTOR CONFIRMADO ║
║ Ameaca         : BAIXA (apenas bobo) ║
║ Acao tomada    : HUMILHACAO PUBLICA  ║
╚══════════════════════════════════════╝`.trim()}</pre>

        <p className="impostor-humilhacao">"{humilhacao}"</p>

        <p className="impostor-dwight-assina">— Dwight K. Schrute, Gerente Assistente</p>

        <div className="impostor-prova">
          <span>Falhou em: </span>
          <strong>Protocolo de Verificacao de Identidade I-247-B</strong>
        </div>

        <button
          className="impostor-btn-voltar"
          onClick={onVoltar}
          disabled={segundos > 0}
        >
          {segundos > 0
            ? `Dwight documenta sua falha... (${segundos}s)`
            : "Entendido. Nunca mais tentarei isso."}
        </button>
      </div>
    </div>
  );
}
