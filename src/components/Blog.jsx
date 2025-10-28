import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/blog.css";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// seta do botão à direita do título
import setaIcon from "../assets/blog-seta.png";

// 👉 usa os mesmos posts do BlogList/BlogPost
import { posts } from "../data/posts";

function formatDateISOToPtBr(iso) {
  // espera "YYYY-MM-DD"
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Blog() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ordena por data (mais novos primeiro) e opcionalmente limita a quantidade
  const items = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      // .slice(0, 12) // <-- se quiser limitar quantos aparecem na home
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        date: formatDateISOToPtBr(p.date),
        cover: p.cover,
      }));
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "keepSnaps",
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
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (i) => emblaApi && emblaApi.scrollTo(i);

  // Fallback quando ainda não há posts
  if (!items.length) {
    return (
      <section id="blog" className="blog">
        <div className="blog-container">
          <div className="blog-head">
            <div>
              <p className="subtitulo">BLOG</p>
              <h2>Conhecimento que transforma o mercado</h2>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 24 }}>
            Em breve novos conteúdos.
          </p>
        </div>
      </section>
    );
  }

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
            <Link to="/blog" className="btn-artigos">
              Leia os artigos <img src={setaIcon} alt="" />
            </Link>
          </div>
        </div>
      </div>

      {/* Carrossel 100vw usando os posts do data/posts */}
      <div className="blog-carousel embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {items.map((p, i) => (
              <div className="embla__slide" key={p.slug}>
                <article className="post-card-home">
                  <Link to={`/blog/${p.slug}`} className="post-card__media">
                    <img src={p.cover} alt={p.title} loading="lazy" />
                  </Link>
                  <div className="post-content">
                    <p className="data">{p.date}</p>
                    <h3 className="post-title">
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <Link to={`/blog/${p.slug}`} className="btn-leia" target="_blank">
                      Leia mais
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots: 1 por post (sincronizados com o carrossel) */}
      <div className="dots-blog" role="tablist" aria-label="Navegação do blog">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === selectedIndex}
            className={`dot-blog ${i === selectedIndex ? "is-active" : ""}`}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para post ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
