import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { posts } from "../data/posts";
import "./blog.css";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="blog">
          <div className="blog-wrap">
            <p>Post não encontrado.</p>
            <button onClick={() => navigate("/blog")} className="btn-back">
              ← Voltar ao Blog
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="blog">
        <article className="post-single blog-wrap">
          <header className="ps-head">
            <h1 className="ps-title">{post.title}</h1>
            <img
              className="ps-cover"
              src={post.cover}
              alt={post.title}
              loading="lazy"
            />
            {post.tags?.length > 0 && (
              <ul className="ps-tags" aria-label="Tags">
                {post.tags.map((t) => (
                  <li key={t}>#{t}</li>
                ))}
              </ul>
            )}
          </header>

          <section
            className="ps-content"
            // conteúdo HTML do post (já sanitizado/controlado no seu array)
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA único conforme o modelo */}
          <div className="ps-see-all">
            <Link to="/blog" className="see-all-btn">
              Ver mais posts »
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
