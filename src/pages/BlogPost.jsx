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

  const prev = posts[postIndex - 1];
  const next = posts[postIndex + 1];

  return (
    <>
      <Header />
      <main className="blog">
        <article className="post-single blog-wrap">
          <header className="ps-head">
    
            <h2 className="ps-title">{post.title}</h2>
            <img className="ps-cover" src={post.cover} alt={post.title} />
            {post.tags?.length > 0 && (
              <ul className="ps-tags">
                {post.tags.map((t) => <li key={t}>#{t}</li>)}
              </ul>
            )}
          </header>

          <section
            className="ps-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <nav className="ps-nav">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="ps-prev">← {prev.title}</Link>
            ) : <span />}
            <Link to="/blog" className="ps-list">Voltar ao Blog</Link>
            {next ? (
              <Link to={`/blog/${next.slug}`} className="ps-next">{next.title} →</Link>
            ) : <span />}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
