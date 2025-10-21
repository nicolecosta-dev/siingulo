// src/components/Setores.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../styles/setores.css";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import prevWhite from "../assets/prev-branca.png";
import nextWhite from "../assets/next-branca.png";

import imgBebidas from "../assets/setores1.png";
import imgAlimentos from "../assets/setores2.png";
import imgFrigorifico from "../assets/setores3.png";
import imgFarmaceutico from "../assets/setores4.png";
import imgCosmeticos from "../assets/setores5.png";
import imgPetroquimica from "../assets/setores6.png";
import imgPetveterinario from "../assets/setores7.png";
import imgAgronegocio from "../assets/setores8.png";

const DATA = [
  { title: "Bebidas", img: imgBebidas },
  { title: "Alimentícios", img: imgAlimentos },
  { title: "Frigorífico", img: imgFrigorifico },
  { title: "Farmacêutico", img: imgFarmaceutico },
  { title: "Cosméticos e Beleza", img: imgCosmeticos },
  { title: "Petroquímica e Química", img: imgPetroquimica },
  { title: "Veterinário e Pet", img: imgPetveterinario },
  { title: "Agronegócio", img: imgAgronegocio },
];

export default function Setores() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef(null);
  const mq = useRef(window.matchMedia("(max-width: 768px)"));
  const [isMobile, setIsMobile] = useState(mq.current.matches);
  useEffect(() => {
    const onChange = (e) => setIsMobile(e.matches);
    mq.current.addEventListener("change", onChange);
    return () => mq.current.removeEventListener("change", onChange);
  }, []);

  // opções do Embla (center no mobile, start no desktop)
  const options = useMemo(
    () => ({
      loop: true,
      align: isMobile ? "center" : "start",
      slidesToScroll: 1,
      containScroll: "keepSnaps",
      skipSnaps: false,
      speed: 10,
    }),
    [isMobile]
  );

  // Embla
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  // reinit quando muda mobile/desktop
  useEffect(() => {
    if (emblaApi) emblaApi.reInit(options);
  }, [emblaApi, options]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // 1 card por "scroll" da PÁGINA quando a seção estiver visível
  useEffect(() => {
    if (!emblaApi) return;

    let lastY = window.scrollY;
    let acc = 0;
    let locked = false;
    const THRESH = 80;     // px para avançar um card
    const COOLDOWN = 260;  // ms entre passos

    const isActive = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      return visible >= vh * 0.3;
    };

    const onScroll = () => {
      if (!isActive()) {
        lastY = window.scrollY;
        acc = 0;
        return;
      }
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      acc += dy;
      if (!locked && Math.abs(acc) >= THRESH) {
        acc > 0 ? emblaApi.scrollNext() : emblaApi.scrollPrev();
        acc = 0;
        locked = true;
        setTimeout(() => (locked = false), COOLDOWN);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [emblaApi]);

  const scrollTo = (index) => emblaApi && emblaApi.scrollTo(index);

  return (
    <section id="setores" className="setores" ref={sectionRef}>
      <div className="setores-shell">
        <div className="setores-head">
          <p className="setores-eyebrow subtitulo">SETORES ATENDIDOS</p>
          <h2 className="setores-title">
            Inovação e excelência para as mais
            <br />
            diferentes áreas de atuação
          </h2>
        </div>

        <div className="setores-carousel embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {DATA.map((s, i) => (
                <div className="embla__slide-setores" key={i}>
                  <article className="setor-card">
                    <img src={s.img} alt={s.title} />
                    <div className="setor-overlay" />
                    <h3 className="setor-title">{s.title}</h3>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Setas MOBILE */}
        <div className="setores-arrows">
          <button
            type="button"
            className="setor-btn prev"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            aria-label="Anterior"
          >
            <img src={prevWhite} alt="" />
          </button>
          <button
            type="button"
            className="setor-btn next"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            aria-label="Próximo"
          >
            <img src={nextWhite} alt="" />
          </button>
        </div>

        <div className="dots-setores" role="tablist" aria-label="Paginação">
          {DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot-setores ${i === selectedIndex ? "is-active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para slide ${i + 1}`}
              aria-selected={i === selectedIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
