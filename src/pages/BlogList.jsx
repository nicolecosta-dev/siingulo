import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { posts } from "../data/posts";
import "./blog.css";

export default function BlogList() {
  useEffect(() => window.scrollTo(0, 0), []);

  // Destaque fixo (primeiro post)
  const featured = posts[0];

  // Restante paginado em grupos de 6 (3x2)
  const restAll = posts.slice(1);
  const pageSize = 6;
  const totalPages = Math.ceil(restAll.length / pageSize);
  const [page, setPage] = useState(0);

  const rest = restAll.slice(page * pageSize, page * pageSize + pageSize);
  const hasMore = page < totalPages - 1;
  const handleLoadMore = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <>
      <Header />
      <main className="blog" role="main">
        <div className="blog-wrap">
          <h1 className="blog-title">
            <span>Blog</span> Siingulo
          </h1>

          {featured && (
            <article className="post-featured" aria-labelledby="pf-title">
              <Link to={`/blog/${featured.slug}`} className="pf-media">
                <img src={featured.cover} alt={featured.title} loading="lazy" />
              </Link>

              <div className="pf-content">
                <div className="pf-meta" aria-label="Categoria">
                  <span>Informação</span>
                </div>
                <h2 id="pf-title">
                  <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p>{featured.excerpt}</p>
        
              </div>
            </article>
          )}

          {/* Grid 3x2 */}
          <section className="post-grid" aria-label="Mais artigos">
            {rest.map((p) => (
              <article key={p.id} className="post-card">
                <Link to={`/blog/${p.slug}`} className="pc-media">
                  <img src={p.cover} alt={p.title} loading="lazy" />
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

          {/* Botão único “Ver mais posts »” */}
          {hasMore && (
            <div className="blog-loadmore">
              <button
                type="button"
                className="loadmore-btn"
                onClick={handleLoadMore}
              >
                Ver mais posts »
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
