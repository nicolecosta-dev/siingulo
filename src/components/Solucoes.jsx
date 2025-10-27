import React, { useEffect, useRef, useState } from "react";
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
  const len = SOLUCOES.length;
  const trackRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % len);
  const prev = () => setIndex((i) => (i - 1 + len) % len);

  // autoplay no mobile
  useEffect(() => {
    if (window.innerWidth > 900) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, []);

  // swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let startX = 0, deltaX = 0, dragging = false;

    const onDown = (e) => {
      dragging = true;
      startX = "touches" in e ? e.touches[0].clientX : e.clientX;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      deltaX = x - startX;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      const threshold = 40;
      if (deltaX > threshold) prev();
      else if (deltaX < -threshold) next();
    };

    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section id="solucoes" className="solucoes" aria-labelledby="solucoes-title">
      <div className="solucoes-container">
        <div className="solucoes-texto">
          <p className="subtitulo">SOLUÇÕES</p>
          <h2 id="solucoes-title">
            Soluções <strong>sob medida</strong>
            <br /> para cada desafio da sua marca.
          </h2>
          <p className="descricao">
            Um portfólio completo para atender às demandas de diferentes
            segmentos da indústria. Da embalagem que conquista no ponto de venda
            ao impresso que protege sua marca contra falsificações, cada solução
            Siingulo é desenvolvida para unir desempenho, inovação e confiabilidade.
          </p>
        </div>

        <div className="solucoes-imagem">
          {/* setas (desktop) */}
          <button className="nav-solucoes prev" onClick={prev} aria-label="Anterior">
            <img src={prevIcon} alt="" />
          </button>

          <div className="viewport">
            <div
              ref={trackRef}
              className="track"
              style={{ transform: `translateX(${-index * 100}%)` }}
            >
              {SOLUCOES.map(({ title, img }) => (
                <figure key={title} className="slide">
                  <img src={img} alt={title} loading="lazy" decoding="async" />
                  <figcaption className="slide-title">{title}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button className="nav-solucoes next" onClick={next} aria-label="Próximo">
            <img src={nextIcon} alt="" />
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
          href="https://w.app/siingulo_comercial"
          className="botao-fale hover-bubble"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={chatIcon} alt="" width="22" height="22" />
          Fale com a Siingulo
        </a>
      </div>
    </section>
  );
}
