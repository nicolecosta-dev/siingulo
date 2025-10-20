import React, { useCallback, useEffect, useState } from "react";
import "../styles/setores.css";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import prevWhite from "../assets/prev-branca.png";
import nextWhite from "../assets/next-branca.png";

// Imagens
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

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1, // anda UMA por vez
      containScroll: "keepSnaps", // mantém 1 snap por slide
      skipSnaps: false,
      speed: 10,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap()); // 0 .. DATA.length-1
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect(); // set inicial
  }, [emblaApi, onSelect]);

  const scrollTo = (index) => emblaApi && emblaApi.scrollTo(index);

  return (
    <section id="setores" className="setores">
      <div className="setores-shell">
        {/* Cabeçalho */}
        <div className="setores-head">
          <p className="setores-eyebrow subtitulo">SETORES ATENDIDOS</p>
          <h2 className="setores-title">
            Inovação e excelência para as mais
            <br />
            diferentes áreas de atuação
          </h2>
        </div>

        {/* Carrossel */}
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
        {/* Setas MOBILE (apenas ≤768px, controladas via CSS) */}
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
        {/* Dots – 1 por slide (sempre 8) */}
        <div className="dots-setores" role="tablist" aria-label="Paginação">
          {DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot-setores ${
                i === selectedIndex ? "is-active" : ""
              }`}
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
