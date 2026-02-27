import { NOMES_PROIBIDOS } from "../data/nomesProibidos";

export function PlacaNomesProibidos() {
  return (
    <div className="placa-proibidos" role="note" aria-label="Nomes proibidos na Schrute Farms">
      <div className="placa-cabecalho">
        <span className="placa-icone">☠️</span>
        <h2>NOMES PROIBIDOS</h2>
        <span className="placa-icone">☠️</span>
      </div>
      <p className="placa-subtitulo">
        Por ordem de D.K. Schrute — Gerente Assistente desta Fazenda
      </p>
      <ul className="placa-lista">
        {NOMES_PROIBIDOS.map((p, i) => (
          <li key={i} className="placa-item">
            <span className="placa-nomes">
              {p.variantes.map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join(" / ")}
            </span>
            <span className="placa-motivo">— {p.motivo}</span>
          </li>
        ))}
      </ul>
      <p className="placa-rodape">
        "A ignorancia da lei nao e desculpa. Voce foi avisado." — D.K.S.
      </p>
    </div>
  );
}
