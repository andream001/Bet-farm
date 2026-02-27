import { useState } from "react";
import { sortearPergunta, Pergunta } from "../data/perguntasDwight";
import { VarianteDwight } from "../data/variantesDwight";

type Fase = "pergunta" | "certo" | "errado";

interface Props {
  nomeFazendeiro: string;
  variante: VarianteDwight;
  onConfirmado: (ppGanho: number) => void;
  onImpostor: () => void;
}

export function VerificacaoDwight({ nomeFazendeiro, variante, onConfirmado, onImpostor }: Props) {
  const [pergunta] = useState<Pergunta>(sortearPergunta);
  const [fase, setFase] = useState<Fase>("pergunta");
  const [ppTotal] = useState(variante.ppBase);
  const [ppGanho, setPpGanho] = useState(0);

  const responder = (indice: number) => {
    if (indice === pergunta.correta) {
      setPpGanho(pergunta.ppRecompensa);
      setFase("certo");
    } else {
      setFase("errado");
    }
  };

  if (fase === "certo") {
    return (
      <div className="verificacao-overlay">
        <div className="verificacao-caixa verificacao-aprovado">
          <div className="verificacao-status">✅ IDENTIDADE CONFIRMADA</div>
          <p className="verificacao-nome">"{nomeFazendeiro}"</p>
          <p className="verificacao-feedback">{pergunta.feedbackCerto}</p>
          <div className="verificacao-pp-resumo">
            <span>PP pelo nome: <strong>+{ppTotal}</strong></span>
            <span>PP pela resposta: <strong>+{ppGanho}</strong></span>
            <span className="verificacao-pp-total">Total: <strong>+{ppTotal + ppGanho} PP</strong></span>
          </div>
          <button className="btn-primario" onClick={() => onConfirmado(ppTotal + ppGanho)}>
            Entrar na Fazenda
          </button>
        </div>
      </div>
    );
  }

  if (fase === "errado") {
    return (
      <div className="verificacao-overlay">
        <div className="verificacao-caixa verificacao-impostor-aviso">
          <div className="verificacao-status">⚠️ RESPOSTA INCORRETA</div>
          <p className="verificacao-feedback">{pergunta.feedbackErrado}</p>
          <button className="btn-impostor" onClick={onImpostor}>
            Ver punição
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="verificacao-overlay">
      <div className="verificacao-caixa">
        <div className="verificacao-header">
          <span className="verificacao-icone">🔍</span>
          <h2>PROTOCOLO DE VERIFICACAO DE IDENTIDADE</h2>
          <span className="verificacao-icone">🔍</span>
        </div>

        <p className="verificacao-saudacao">{variante.saudacao}</p>
        <p className="verificacao-nome">Nome informado: <strong>"{nomeFazendeiro}"</strong></p>

        <div className="verificacao-pergunta">
          <p className="verificacao-enunciado">{pergunta.enunciado}</p>
          <div className="verificacao-opcoes">
            {pergunta.opcoes.map((op, i) => (
              <button key={i} className="verificacao-opcao" onClick={() => responder(i)}>
                <span className="verificacao-letra">{String.fromCharCode(65 + i)}</span>
                {op}
              </button>
            ))}
          </div>
        </div>

        <p className="verificacao-aviso">
          ⚠️ Resposta errada = humilhação pública. Você foi avisado.
        </p>
      </div>
    </div>
  );
}
