export function Legenda() {
  return (
    <div className="legenda">
      <div className="legenda-titulo">PROTOCOLO DE CAMPO</div>
      <ul>
        <li><span className="cor-swatch" style={{ background: "#c8a97e" }} /> VAZIO — clique para plantar</li>
        <li><span className="cor-swatch" style={{ background: "#6B4423" }} /> 🌱 PLANTADO</li>
        <li><span className="cor-swatch" style={{ background: "#5a8a2a" }} /> 🌿 CRESCENDO</li>
        <li><span className="cor-swatch" style={{ background: "#8B1A1A" }} /> 🟥 MADURO — clique para colher</li>
        <li><span className="cor-swatch" style={{ background: "#c8b030" }} /> ✨ COLHIDO</li>
      </ul>
      <div className="legenda-rodape">Maturacao: 15s por parcela</div>
    </div>
  );
}
