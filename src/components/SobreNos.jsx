// src/components/SobreNos.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/sobre.css";
import CounterSmooth from "../hooks/CounterSmooth.jsx";

import pointsImg from "../assets/Points-Siingulo.png";

export default function SobreNos() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const baselineY = useRef(null);
  const cycleRef = useRef(1);

  useEffect(() => {
    const elSection = sectionRef.current;
    const elTrack = trackRef.current;
    if (!elSection || !elTrack) return;

    const computeCycle = () => {
      // metade do conteúdo duplicado para looping perfeito
      const half = elTrack.scrollWidth / 2;
      cycleRef.current = Math.max(1, half);
    };

    const onEnter = () => {
      if (baselineY.current == null) baselineY.current = window.scrollY;
    };

    const onScroll = () => {
      // garante baseline assim que a seção tocar a viewport
      const rect = elSection.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const isVisible = rect.bottom > 0 && rect.top < vh;
      if (isVisible && baselineY.current == null) onEnter();

      if (baselineY.current == null) return;

      // deslocamento determinístico: quanto rolou desde a entrada na viewport
      const speed = 0.35; // ← ajuste fino da velocidade horizontal
      const dx = (window.scrollY - baselineY.current) * speed;

      // normaliza para [0, ciclo)
      const cycle = cycleRef.current;
      let norm = dx % cycle;
      if (norm < 0) norm += cycle;

      setOffset(norm);
    };

    computeCycle();
    onScroll();

    const ro = new ResizeObserver(() => {
      computeCycle();
      onScroll();
    });
    ro.observe(elTrack);
    window.addEventListener("resize", () => {
      computeCycle();
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    // font loading pode mudar medidas
    document.fonts?.ready
      ?.then(() => {
        computeCycle();
        onScroll();
      })
      .catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", () => {});
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="sobre" className="sobre" ref={sectionRef}>
      <div className="container-sobre">
        {/* Texto */}
        <div className="sobre-texto">
          <p className="sobre-nos subtitulo">SOBRE NÓS</p>
          <h1 className="sobre-titulo">
            Tecnologia, escala e confiança para os <span>grandes players</span>{" "}
            da indústria
          </h1>
          <p className="sobre-desc">
            A Siingulo é <b>referência nacional em impressos de segurança</b> e
            aplica a mesma tecnologia, precisão e capacidade de escala na
            produção de rótulos e etiquetas de alta segurança. Nossas estruturas
            e processos de classe mundial permitem atender desde pequenas a
            grandes produções com a agilidade e confiabilidade que os grandes
            players da indústria exigem.
          </p>
        </div>

        {/* Imagem com pontos */}
        <div className="sobre-img">
          <img src={pointsImg} alt="Destaques Siingulo" />
        </div>
      </div>

      {/* Destaques */}
      <div className="sobre-destaques">
        <div>
          <h3 className="sobre-num">
            <CounterSmooth end={15} duration={1200} /> {/* 15 */}
          </h3>
          <p className="p-1">anos de experiência no setor gráfico</p>
        </div>

        <div>
          <h3 className="sobre-num">
            +<CounterSmooth end={1_000_000} duration={1800} /> {/* 1 mi */}
          </h3>
          <p className="p-2">Clientes em todo o Brasil</p>
        </div>

        <div>
          <h3 className="sobre-num">
            +<CounterSmooth end={50_000} duration={2000} /> {/* 50 mi */}
          </h3>
          <p className="p-3">de tickets impressos</p>
        </div>
      </div>

      {/* Frase em slide (controlada pelo scroll) */}
      <p
        className="sobre-slide"
        aria-label="FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS"
      >
        <span
          className="marquee-track"
          ref={trackRef}
          style={{ transform: `translateX(${-offset}px)` }}
        >
          {/* conteúdo duplicado para looping infinito */}
          <span className="marquee-item">
            FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS
          </span>
          <span className="marquee-item">
            FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS
          </span>
          <span className="marquee-item">
            FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS
          </span>
          <span className="marquee-item">
            FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS
          </span>
          {/* duplicatas extras ajudam a não “revelar” lacunas em telas largas */}
          <span className="marquee-item" aria-hidden="true">
            FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS
          </span>
          <span className="marquee-item" aria-hidden="true">
            FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS
          </span>
        </span>
      </p>
    </section>
  );
}
