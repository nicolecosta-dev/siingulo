import React, { useCallback, useEffect, useState } from "react";
import "../styles/blog.css";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// imagens dos posts
import post1 from "../assets/blog1.png";
import post2 from "../assets/blog2.png";
import post3 from "../assets/blog3.png";
import post4 from "../assets/blog4.png";

// seta do botão à direita do título
import setaIcon from "../assets/blog-seta.png";

const POSTS = [
  {
    data: "2 de julho de 2025",
    title: "Uma nova tecnologia que vai elevar a flexografia a outro nível",
    img: post1,
  },
  {
    data: "15 de maio de 2025",
    title:
      "Personalização que conecta: o case “Share a Coke” e o poder dos dados variáveis",
    img: post2,
  },
  {
    data: "6 de maio de 2025",
    title: "Seu rótulo tem 5 segundos para convencer",
    img: post3,
  },
  {
    data: "2 de abril de 2025",
    title: "De líder em segurança gráfica à inovação em rótulos e etiquetas",
    img: post4,
  },
  {
    data: "2 de julho de 2025",
    title: "Uma nova tecnologia que vai elevar a flexografia a outro nível",
    img: post1,
  },
  {
    data: "15 de maio de 2025",
    title:
      "Personalização que conecta: o case “Share a Coke” e o poder dos dados variáveis",
    img: post2,
  },
  {
    data: "6 de maio de 2025",
    title: "Seu rótulo tem 5 segundos para convencer",
    img: post3,
  },
  {
    data: "2 de abril de 2025",
    title: "De líder em segurança gráfica à inovação em rótulos e etiquetas",
    img: post4,
  },
];

export default function Blog() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true, // 1→2→3→4→1...
      align: "start",
      slidesToScroll: 1, // anda 1 por vez
      containScroll: "keepSnaps", // garante 1 snap por slide mesmo com 3 visíveis
      skipSnaps: false,
      speed: 10,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap()); // 0..POSTS.length-1
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (i) => emblaApi && emblaApi.scrollTo(i);

  return (
    <section id="blog" className="blog">
      <div className="blog-container">
        <div className="blog-head">
          <div>
            <p className="subtitulo">BLOG</p>
            <h2>
              Conhecimento que <br /> transforma o mercado
            </h2>
          </div>
          <div className="blog-right">
            <p>
              Insights sobre inovação, tecnologia e soluções gráficas para
              marcas que buscam se destacar.
            </p>
            <a href="/blog" className="btn-artigos">
              Leia os artigos <img src={setaIcon} alt="" />
            </a>
          </div>
        </div>
      </div>

      {/* Carrossel 100vw */}
      <div className="blog-carousel embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {POSTS.map((p, i) => (
              <div className="embla__slide" key={i}>
                <article className="post-card">
                  <img src={p.img} alt={p.title} />
                  <div className="post-content">
                    <p className="data">{p.data}</p>
                    <h3>{p.title}</h3>
                    <button className="btn-leia" type="button">
                      Leia mais
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots: 1 por post */}
      <div className="dots-blog">
        {POSTS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot-blog ${i === selectedIndex ? "is-active" : ""}`}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para post ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
