import React, { useState, useEffect } from "react";
import "../styles/solucoes.css";
import chatIcon from "../assets/chat.png";

import prevIcon from "../assets/prev.png";
import nextIcon from "../assets/next.png";

/* imagens */
import img1 from "../assets/solucao1.png";
import img2 from "../assets/solucao2.png";
import img3 from "../assets/solucao3.png";

const SOLUCOES = [
  { title: "In Mold Label", img: img1 },
  { title: "Embalagem Inteligente", img: img2 },
  { title: "Rótulo Premium", img: img3 },
];

export default function Solucoes() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % SOLUCOES.length);
  const prev = () =>
    setIndex((i) => (i - 1 + SOLUCOES.length) % SOLUCOES.length);

  // 🎬 autoplay no mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SOLUCOES.length);
    }, 3000); // muda a cada 3s

    return () => clearInterval(timer);
  }, []);

  const { title, img } = SOLUCOES[index];

  return (
    <section id="solucoes" className="solucoes">
      <div className="solucoes-container">
        <div className="solucoes-texto">
          <p className="subtitulo">SOLUÇÕES</p>
          <h2>
            Soluções <strong>sob medida</strong>
            <br /> para cada desafio da sua marca.
          </h2>
          <p className="descricao">
            Um portfólio completo para atender às demandas de diferentes
            segmentos da indústria. Da embalagem que conquista no ponto de venda
            ao impresso que protege sua marca contra falsificações, cada solução
            Siingulo é desenvolvida para unir desempenho, inovação e
            confiabilidade.
          </p>
        </div>

        <div className="solucoes-imagem">
          {/* setas (desktop/tablet) */}
          <button
            className="nav-solucoes prev"
            onClick={prev}
            aria-label="Anterior"
          >
            <img src={prevIcon} alt="Anterior" />
          </button>

          <div className="img-wrapper">
            <img src={img} alt={title} />
            <h4>{title}</h4>
          </div>

          <button
            className="nav-solucoes next"
            onClick={next}
            aria-label="Próximo"
          >
            <img src={nextIcon} alt="Próximo" />
          </button>

          {/* bolinhas (mobile) */}
          <div className="dots-solucoes">
            {SOLUCOES.map((_, i) => (
              <button
                key={i}
                className={`dot-solucoes ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <a
          href="https://w.app/siingulo_comercial "
          className="botao-fale"
          target="_blank"
        >
          <img src={chatIcon} alt="" />
          Fale com a Siingulo
        </a>
      </div>
    </section>
  );
}
