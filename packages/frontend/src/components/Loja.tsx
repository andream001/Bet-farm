import { useState } from "react";
import { CATALOGO, ItemLoja } from "../data/itensLoja";

interface Props {
  schruteDolares: number;
  itensComprados: string[];
  onComprar: (itemId: string) => Promise<void>;
  onFechar: () => void;
}

export function Loja({ schruteDolares, itensComprados, onComprar, onFechar }: Props) {
  const [comprando, setComprando] = useState<string | null>(null);
  const [ultimaMsg, setUltimaMsg] = useState<{ texto: string; ok: boolean } | null>(null);

  const handleComprar = async (item: ItemLoja) => {
    setComprando(item.id);
    setUltimaMsg(null);
    try {
      await onComprar(item.id);
      const msg = item.id === "remedio_mose"
        ? "Mose entregou o remedio. Efeito aplicado."
        : `${item.nome} adquirido com sucesso!`;
      setUltimaMsg({ texto: msg, ok: true });
    } catch (e) {
      setUltimaMsg({ texto: String(e).replace("Error: ", ""), ok: false });
    } finally {
      setComprando(null);
    }
  };

  const porCategoria = (cat: string) => CATALOGO.filter((i) => i.categoria === cat);

  const podePagar = (item: ItemLoja) => schruteDolares >= item.preco;
  const jaComprou = (item: ItemLoja) => item.unico && itensComprados.includes(item.id);

  return (
    <div className="loja-overlay" onClick={onFechar}>
      <div className="loja-painel" onClick={(e) => e.stopPropagation()}>

        <div className="loja-cabecalho">
          <div>
            <h2>🏪 Loja Schrute</h2>
            <p className="loja-subtitulo">"Se eu vendo, voce compra." — D.K.S.</p>
          </div>
          <div className="loja-saldo">
            <span>Saldo</span>
            <strong className="loja-sd">💵 ${schruteDolares} SD</strong>
          </div>
          <button className="loja-fechar" onClick={onFechar} title="Fechar loja">✕</button>
        </div>

        {ultimaMsg && (
          <div className={`loja-msg ${ultimaMsg.ok ? "loja-msg-ok" : "loja-msg-erro"}`}>
            {ultimaMsg.ok ? "✅" : "❌"} {ultimaMsg.texto}
          </div>
        )}

        <div className="loja-secao">
          <h3 className="loja-categoria">⚒️ Ferramentas de Fazenda</h3>
          <div className="loja-grade">
            {porCategoria("fazenda").map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                podePagar={podePagar(item)}
                jaComprou={jaComprou(item)}
                comprando={comprando === item.id}
                onComprar={() => handleComprar(item)}
              />
            ))}
          </div>
        </div>

        <div className="loja-secao">
          <h3 className="loja-categoria">🎲 Itens Especiais</h3>
          <div className="loja-grade">
            {porCategoria("especial").map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                podePagar={podePagar(item)}
                jaComprou={jaComprou(item)}
                comprando={comprando === item.id}
                onComprar={() => handleComprar(item)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

interface CardProps {
  item: ItemLoja;
  podePagar: boolean;
  jaComprou: boolean;
  comprando: boolean;
  onComprar: () => void;
}

function ItemCard({ item, podePagar, jaComprou, comprando, onComprar }: CardProps) {
  const desabilitado = jaComprou || comprando || !podePagar;

  return (
    <div className={`loja-card ${jaComprou ? "loja-card-owned" : ""} ${!podePagar && !jaComprou ? "loja-card-caro" : ""}`}>
      <span className="loja-card-emoji">{item.emoji}</span>
      <div className="loja-card-info">
        <strong className="loja-card-nome">{item.nome}</strong>
        <p className="loja-card-desc">{item.descricao}</p>
        <p className="loja-card-efeito">→ {item.efeito}</p>
      </div>
      <div className="loja-card-rodape">
        <span className="loja-card-preco">💵 ${item.preco} SD</span>
        <button
          className="loja-btn-comprar"
          onClick={onComprar}
          disabled={desabilitado}
        >
          {jaComprou ? "✓ Adquirido" : comprando ? "..." : "Comprar"}
        </button>
      </div>
    </div>
  );
}
