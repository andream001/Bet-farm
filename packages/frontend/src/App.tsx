import { useState, useEffect } from "react";
import { TelaInicio } from "./components/TelaInicio";
import { GameCanvas } from "./components/GameCanvas";
import { HUD } from "./components/HUD";
import { Legenda } from "./components/Legenda";
import { Loja } from "./components/Loja";
import { useFazenda } from "./hooks/useFazenda";
import { fraseAleatoria } from "./engine/GameEngine";
import "./styles/schrute.css";

export default function App() {
  const { fazenda, carregando, erro, pontosPersonalidade, iniciarFazenda, plantarParcela, colherParcela, comprarNaLoja, abandonarFazenda } = useFazenda();
  const [frase, setFrase] = useState(fraseAleatoria);
  const [lojaAberta, setLojaAberta] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setFrase(fraseAleatoria()), 8000);
    return () => clearInterval(t);
  }, []);

  if (!fazenda) {
    return (
      <main className="container">
        <TelaInicio onIniciar={(nome, pp) => iniciarFazenda(nome, pp)} carregando={carregando} />
        {erro && <p className="mensagem-erro">{erro}</p>}
      </main>
    );
  }

  return (
    <main className="container">
      {lojaAberta && (
        <Loja
          schruteDolares={fazenda.schruteDolares}
          itensComprados={fazenda.itensComprados}
          onComprar={comprarNaLoja}
          onFechar={() => setLojaAberta(false)}
        />
      )}
      <div className="barra-topo">
        <button className="btn-voltar" onClick={abandonarFazenda} title="Voltar ao início">
          ← Sair da Fazenda
        </button>
      </div>
      <HUD
        nomeFazendeiro={fazenda.nomeFazendeiro}
        beterrabas={fazenda.beterrabas}
        pontos={fazenda.pontos}
        schruteDolares={fazenda.schruteDolares}
        pontosPersonalidade={pontosPersonalidade}
        frase={frase}
        onAbrirLoja={() => setLojaAberta(true)}
      />
      {erro && <p className="mensagem-erro">{erro}</p>}
      <div className="area-jogo">
        <GameCanvas
          parcelas={fazenda.parcelas}
          onPlantar={plantarParcela}
          onColher={colherParcela}
        />
        <Legenda />
      </div>
    </main>
  );
}
