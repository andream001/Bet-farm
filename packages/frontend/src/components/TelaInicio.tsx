import { useState } from "react";
import { ehNomeProibido, NomeProibido } from "../data/nomesProibidos";
import { detectarVarianteDwight, VarianteDwight, ehMose } from "../data/variantesDwight";
import { DwightFurioso } from "./DwightFurioso";
import { PlacaNomesProibidos } from "./PlacaNomesProibidos";
import { VerificacaoDwight } from "./VerificacaoDwight";
import { ImpostorDetectado } from "./ImpostorDetectado";

type Fase = "inicio" | "verificacao" | "impostor" | "proibido";

interface Props {
  onIniciar: (nome: string, pp?: number) => void;
  carregando: boolean;
}

export function TelaInicio({ onIniciar, carregando }: Props) {
  const [nome, setNome] = useState("");
  const [fase, setFase] = useState<Fase>("inicio");
  const [nomeSubmetido, setNomeSubmetido] = useState("");
  const [dadosProibido, setDadosProibido] = useState<NomeProibido | null>(null);
  const [varianteDwight, setVarianteDwight] = useState<VarianteDwight | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimado = nome.trim();
    if (!trimado) return;

    const proibido = ehNomeProibido(trimado);
    if (proibido) {
      setNomeSubmetido(trimado);
      setDadosProibido(proibido);
      setFase("proibido");
      return;
    }

    if (ehMose(trimado)) {
      onIniciar(trimado, 5);
      return;
    }

    const variante = detectarVarianteDwight(trimado);
    if (variante) {
      setNomeSubmetido(trimado);
      setVarianteDwight(variante);
      setFase("verificacao");
      return;
    }

    onIniciar(trimado, 0);
  };

  const resetar = () => {
    setFase("inicio");
    setNome("");
    setDadosProibido(null);
    setVarianteDwight(null);
    setNomeSubmetido("");
  };

  if (fase === "proibido" && dadosProibido) {
    return (
      <DwightFurioso
        nomeDigitado={nomeSubmetido}
        dadosProibido={dadosProibido}
        onDispensa={resetar}
      />
    );
  }

  if (fase === "verificacao" && varianteDwight) {
    return (
      <VerificacaoDwight
        nomeFazendeiro={nomeSubmetido}
        variante={varianteDwight}
        onConfirmado={(pp) => onIniciar(nomeSubmetido, pp)}
        onImpostor={() => setFase("impostor")}
      />
    );
  }

  if (fase === "impostor") {
    return (
      <ImpostorDetectado
        nomeFazendeiro={nomeSubmetido}
        onVoltar={resetar}
      />
    );
  }

  return (
    <div className="tela-inicio">
      <h1 className="titulo-principal">🌱 Schrute Farms</h1>
      <p className="subtitulo">O jogo oficial de cultivo de beterrabas</p>
      <form onSubmit={handleSubmit} className="form-inicio">
        <label htmlFor="nome-fazendeiro">Nome do Fazendeiro</label>
        <input
          id="nome-fazendeiro"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Dwight K. Schrute"
          maxLength={40}
          autoFocus
        />
        <button type="submit" disabled={carregando || !nome.trim()} className="btn-primario">
          {carregando ? "Preparando a terra..." : "Iniciar Fazenda"}
        </button>
      </form>
      <div className="legenda-inicio">
        <span>🟥 Maduro — clique para colher</span>
        <span>🌱 Plantado — aguarde crescer</span>
        <span>🟫 Vazio — clique para plantar</span>
      </div>

      <PlacaNomesProibidos />
    </div>
  );
}
