import { useState, useEffect, useRef } from "react";

export function useTypewriter(texto: string, velocidadeMs = 38): { exibido: string; digitando: boolean } {
  const [exibido, setExibido] = useState("");
  const [digitando, setDigitando] = useState(false);
  const refTexto = useRef(texto);

  useEffect(() => {
    if (texto === refTexto.current && exibido === texto) return;
    refTexto.current = texto;
    setExibido("");
    setDigitando(true);

    let i = 0;
    const intervalo = setInterval(() => {
      i++;
      setExibido(texto.slice(0, i));
      if (i >= texto.length) {
        clearInterval(intervalo);
        setDigitando(false);
      }
    }, velocidadeMs);

    return () => clearInterval(intervalo);
  }, [texto, velocidadeMs]);

  return { exibido, digitando };
}
