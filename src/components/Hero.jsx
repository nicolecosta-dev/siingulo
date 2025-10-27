import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import "../styles/hero.css";

import heroArt from "../assets/hero-bg.png";
import referenciaNacional from "../assets/referencia-nacional.png";
import seta from "../assets/seta.png";
import setaBaixo from "../assets/seta-baixo.png";
import setaLaranja from "../assets/seta-laranja.png";

export default function Hero() {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef(null);
  const sectionRef = useRef(null); // ⬅️ base para calcular o progresso da seção
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    const update = () => {
      rafRef.current = null;
      if (reduced.current) {
        setAngle(0);
        return;
      }
      const sec = sectionRef.current;
      if (!sec) return;

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || 0;

      // progresso da seção passando pelo viewport (0 → 1 → 2… se quiser mais voltas)
      // aqui mapeamos “quando a seção entra até sair” para 0..1
      const total = rect.height + vh; // tempo total de exposição no viewport
      const passed = Math.min(total, Math.max(0, vh - rect.top));
      const progress = total > 0 ? passed / total : 0;

      // quantas voltas você quer ao atravessar a seção inteira:
      const TURNS = 1;
      const deg = progress * TURNS * 360;

      setAngle(deg);
    };

    // primeira leitura + listeners (throttle via rAF)
    update();
    const onScroll = schedule;
    const onResize = schedule;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleScrollToSobre = (e) => {
    e.preventDefault();
    const target = document.querySelector("#sobre");
    if (target) {
      const headerOffset = 80;
      const top = Math.max(0, target.offsetTop - headerOffset);
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="hero"
      aria-label="Abertura Siingulo"
      ref={sectionRef}
    >
      <div className="hero__header">
        <Header />
      </div>

      <div
        className="hero__bg"
        aria-hidden="true"
        style={{ "--hero-art": `url(${heroArt})` }}
      />

      <div className="container-pad hero__wrap">
        <div className="hero__content">
          <h1 className="hero__title">
            Transformamos ideias <br />
            em <span>soluções únicas</span>
          </h1>
          <p className="hero__desc">
            Rótulos e impressos de segurança com tecnologia exclusiva,
            capacidade de grandes escalas e personalização para indústrias que
            exigem inovação e confiança.
          </p>

          <div className="hero__actions">
            <a
              href="https://w.app/siingulo_comercial"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary hover-bubble"
              aria-label="Fale com a Siingulo no WhatsApp"
            >
              <span>Fale com a Siingulo</span>
              <img
                src={seta}
                alt=""
                className="btn__icon icon-desktop"
                width="20"
                height="20"
                loading="lazy"
                decoding="async"
              />
              <img
                src={setaLaranja}
                alt=""
                className="btn__icon icon-mobile"
                width="20"
                height="20"
                loading="lazy"
                decoding="async"
              />
            </a>

            <a
              href="#sobre"
              className="btn btn--outline hover-bubble"
              onClick={handleScrollToSobre}
              aria-label="Saiba mais sobre a Siingulo"
            >
              <span>Saiba Mais</span>
              <img
                src={setaBaixo}
                alt=""
                className="btn__icon"
                width="20"
                height="20"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <img
            src={heroArt}
            alt=""
            className="hero__art-img"
            width="1240"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="hero__badge" aria-hidden="true">
          <img
            src={referenciaNacional}
            alt=""
            className="hero__badge-img"
            style={{ transform: `rotate(${angle}deg)` }}
            width="400"
            height="400"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
