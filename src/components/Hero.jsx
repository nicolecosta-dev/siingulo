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
  const raf = useRef(null);

  useEffect(() => {
    let pending = 0;

    const onScrollish = (e) => {
      const delta =
        typeof e.deltaY === "number"
          ? e.deltaY
          : window.scrollY - (onScrollish._lastY || 0);
      onScrollish._lastY = window.scrollY;
      pending += delta * 0.12;

      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          setAngle((a) => a + pending);
          pending = 0;
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
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // === função para scroll suave ao clicar em “Saiba Mais”
  const handleScrollToSobre = (e) => {
    e.preventDefault();
    const target = document.querySelector("#sobre");
    if (target) {
      const headerOffset = 80; // ajuste se o header for fixo
      const targetPos = target.offsetTop - headerOffset;
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero__header">
        <Header />
      </div>

      <div
        className="hero__bg"
        aria-hidden
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
              className="btn btn--primary"
              rel="noreferrer"
            >
              <span>Fale com a Siingulo</span>
              <img src={seta} alt="" className="btn__icon icon-desktop" />
              <img src={setaLaranja} alt="" className="btn__icon icon-mobile" />
            </a>

            {/* botão com rolagem suave */}
            <a
              href="#sobre"
              className="btn btn--outline"
              onClick={handleScrollToSobre}
            >
              <span>Saiba Mais</span>
              <img src={setaBaixo} alt="" className="btn__icon" />
            </a>
          </div>
        </div>

        <div className="hero__art">
          <img src={heroArt} alt="Arte Siingulo" className="hero__art-img" />
        </div>

        <div className="hero__badge" aria-hidden>
          <img
            src={referenciaNacional}
            alt="Referência Nacional"
            className="hero__badge-img"
            style={{ transform: `rotate(${angle}deg)` }}
          />
        </div>
      </div>
    </section>
  );
}
