import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { posts } from "../data/posts";
import "./blog.css";

export default function BlogList() {
  useEffect(() => window.scrollTo(0, 0), []);

  // 1) Destaque fixo em todas as páginas
  const featured = posts[0];

  // 2) Paginação só do restante
  const restAll = posts.slice(1);     // tudo menos o destaque
  const pageSize = 6;                 // 6 cards por página (abaixo do destaque)
  const totalPages = Math.ceil(restAll.length / pageSize);

  const [page, setPage] = useState(0);

  // fatia apenas o restante
  const rest = restAll.slice(page * pageSize, page * pageSize + pageSize);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <>
      <Header />
      <main className="blog">
        <div className="blog-wrap">
          <h1 className="blog-title">
            <span>Blog</span> Siingulo
          </h1>

          {/* Destaque — sempre o mesmo */}
          {featured && (
            <article className="post-featured">
              <Link to={`/blog/${featured.slug}`} className="pf-media">
                <img src={featured.cover} alt={featured.title} />
              </Link>
              <div className="pf-content">
                <div className="pf-meta">
                  <span>Informação</span>
                </div>
                <h2>
                  <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p>{featured.excerpt}</p>
              </div>
            </article>
          )}

          {/* Grid inferior: 6 por página (apenas do restante) */}
          <section className="post-grid">
            {rest.map((p) => (
              <article key={p.id} className="post-card">
                <Link to={`/blog/${p.slug}`} className="pc-media">
                  <img src={p.cover} alt={p.title} />
                </Link>
                <div className="pc-body">
                  <h3 className="pc-title">
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="pc-excerpt">{p.excerpt}</p>
                  <Link className="pc-readmore" to={`/blog/${p.slug}`}>
                    Ler mais →
                  </Link>
                </div>
              </article>
            ))}
          </section>

          {/* paginação (age só no restante) */}
          {totalPages > 1 && (
            <div className="blog-pagination">
              <button
                onClick={handlePrev}
                disabled={page === 0}
                className="page-btn"
              >
                ← Anterior
              </button>
              <span className="page-info">
                Página {page + 1} de {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages - 1}
                className="page-btn"
              >
                Próximo →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
