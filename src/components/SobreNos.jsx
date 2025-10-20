import React, { useEffect, useRef, useState } from "react";
import "../styles/sobre.css";

import pointsImg from "../assets/Points-Siingulo.png";

export default function SobreNos() {
  // refs para controlar o slide
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const raf = useRef(null);

  // deslocamento acumulado em px
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let pending = 0; // quanto “falta” aplicar
    let lastY = window.scrollY;
    let cycle = 0; // largura do ciclo (metade do conteúdo duplicado)
    let prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const computeCycle = () => {
      // pegamos a metade, já que o conteúdo está duplicado
      if (trackRef.current) {
        const half = trackRef.current.scrollWidth / 2;
        cycle = Math.max(half, 1);
      }
    };

    const inViewport = () => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      // considera “ativo” quando ao menos 20% da seção está visível
      const vh = window.innerHeight || 0;
      const visible = Math.max(
        0,
        Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      );
      return visible >= vh * 0.2;
    };

    computeCycle();
    const onResize = () => computeCycle();
    window.addEventListener("resize", onResize);

    const onScrollish = (e) => {
      if (prefersReduced) return; // respeita acessibilidade
      if (!inViewport()) {
        // só move quando a seção está na tela
        lastY = window.scrollY;
        return;
      }

      // delta do scroll (funciona para wheel, scroll e touchmove)
      const y = window.scrollY;
      const delta = typeof e.deltaY === "number" ? e.deltaY : y - lastY;
      lastY = y;

      // sensibilidade do arrasto horizontal por delta vertical
      // ex.: 0.35 px por “unidade” de delta
      pending += delta * 0.35;

      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          setOffset((curr) => {
            // aplica o pending e normaliza para loop
            const next = curr + pending;
            pending = 0;
            if (!cycle) return next; // sem medir ainda, só aplica
            // normaliza no intervalo [0, cycle)
            let norm = next % cycle;
            if (norm < 0) norm += cycle;
            return norm;
          });
          raf.current = null;
        });
      }
    };

    window.addEventListener("wheel", onScrollish, { passive: true });
    window.addEventListener("scroll", onScrollish, { passive: true });
    window.addEventListener("touchmove", onScrollish, { passive: true });

    return () => {
      window.removeEventListener("wheel", onScrollish);
      window.removeEventListener("scroll", onScrollish);
      window.removeEventListener("touchmove", onScrollish);
      window.removeEventListener("resize", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
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
          <h3>+15 anos</h3>
          <p>de experiência no setor gráfico</p>
        </div>
        <div>
          <h3>+1.000</h3>
          <p>clientes em todo o Brasil</p>
        </div>
        <div>
          <h3>+50 milhões</h3>
          <p>de tickets impressos</p>
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
          // move para a esquerda conforme o scroll; como normalizamos em [0,cycle),
          // é seguro dar translateX negativo desse offset
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
