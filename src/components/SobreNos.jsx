import React, { useEffect, useRef, useState, useMemo } from "react";
import "../styles/sobre.css";
import CounterSmooth from "../hooks/CounterSmooth.jsx";
import pointsImg from "../assets/Points-Siingulo.png";

function formatAriaNumber(n) {
  // bem simples para os três casos que você usa aqui
  if (n >= 1_000_000_000) return `${Math.round(n / 1_000_000_000)} bilhões`;
  if (n >= 1_000_000) return `${Math.round(n / 1_000_000)} milhões`;
  if (n >= 1_000) return `${Math.round(n / 1_000)} mil`;
  return `${n}`;
}

export default function SobreNos() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const baselineY = useRef(null);
  const cycleRef = useRef(1);

  // ===== marquee scroll-driven (estável + cleanup correto)
  useEffect(() => {
    const elSection = sectionRef.current;
    const elTrack = trackRef.current;
    if (!elSection || !elTrack) return;

    const computeCycle = () => {
      const half = elTrack.scrollWidth / 2; // conteúdo duplicado
      cycleRef.current = Math.max(1, half);
    };

    const onEnter = () => {
      if (baselineY.current == null) baselineY.current = window.scrollY;
    };

    let rafId = null;
    const SPEED = 0.35; // ← velocidade horizontal
    const update = () => {
      rafId = null;
      const rect = elSection.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const isVisible = rect.bottom > 0 && rect.top < vh;
      if (isVisible && baselineY.current == null) onEnter();
      if (baselineY.current == null) return;

      const dx = (window.scrollY - baselineY.current) * SPEED;
      const cycle = cycleRef.current;
      let norm = dx % cycle;
      if (norm < 0) norm += cycle;
      setOffset(norm);
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      computeCycle();
      schedule();
    };

    computeCycle();
    update();

    const ro = new ResizeObserver(onResize);
    ro.observe(elTrack);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", schedule, { passive: true });

    document.fonts?.ready?.then(onResize).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ARIA labels para os números
  const aria15Anos = useMemo(() => formatAriaNumber(15), []);
  const aria1Mi = useMemo(() => formatAriaNumber(1_000_000), []);
  const aria50Mi = useMemo(() => formatAriaNumber(50_000_000), []);

  return (
    <section
      id="sobre"
      className="sobre"
      ref={sectionRef}
      aria-labelledby="sobre-title"
      role="region"
    >
      <div className="container-sobre">
        {/* Texto */}
        <div className="sobre-texto">
          <p className="sobre-nos subtitulo">SOBRE NÓS</p>
          <h2 id="sobre-title" className="sobre-titulo">
            Tecnologia, escala e confiança para os <span>grandes players</span>{" "}
            da indústria
          </h2>
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
          <img
            src={pointsImg}
            alt="Pontos de destaque dos serviços da Siingulo"
            width="640"
            height="640"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Destaques */}
      <div className="sobre-destaques" aria-label="Nossos números">
        <div>
          <h3 className="sobre-num" aria-label={`${aria15Anos} de experiência`}>
            <CounterSmooth end={15} duration={1200} />
          </h3>
          <p className="p-1">anos de experiência no setor gráfico</p>
        </div>

        <div>
          <h3 className="sobre-num" aria-label={`${aria1Mi} de clientes`}>
            +<CounterSmooth end={1_000_000} duration={1800} />
          </h3>
          <p className="p-2">Clientes em todo o Brasil</p>
        </div>

        <div>
          <h3
            className="sobre-num"
            aria-label={`${aria50Mi} de tickets impressos`}
          >
            +<CounterSmooth end={50_000_000} duration={2000} />
          </h3>
          <p className="p-3">de tickets impressos</p>
        </div>
      </div>

      {/* Frase em slide (decorativa para leitores de tela) */}
      <p className="sobre-slide">
        <span className="sr-only">
          FLEXIBILIDADE E INOVAÇÃO COM SOLUÇÕES PERSONALIZADAS
        </span>

        <span
          className="marquee-track"
          ref={trackRef}
          aria-hidden="true"
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
