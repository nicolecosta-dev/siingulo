import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/header.css";

import logo from "../assets/logo.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import seta from "../assets/seta.png";
import menuIcon from "../assets/menu-hamburger.png";
import closeIcon from "../assets/close-hamburger.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const firstFocusable = useRef(null);
  const triggerBtnRef = useRef(null);
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // sombra ao rolar
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // trava body quando menu abre
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("no-scroll");
      setTimeout(() => firstFocusable.current?.focus(), 40);
    } else {
      root.classList.remove("no-scroll");
      triggerBtnRef.current?.focus?.();
    }
    return () => root.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    const setHeaderVar = () => {
      const h = headerRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setHeaderVar();
    const ro = new ResizeObserver(setHeaderVar);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", setHeaderVar);
    document.fonts?.ready?.then(setHeaderVar).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setHeaderVar);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (!open || e.key !== "Tab") return;

      const panel = panelRef.current;
      const focusables = panel?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = (hash) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className={`app-header ${scrolled ? "is-scrolled" : ""} ${
        open ? "menu-open" : ""
      }`}
    >
      {/* Dados estruturados SEO (WebSite) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Siingulo",
          url: "https://www.seudominio.com.br",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.seudominio.com.br/?s={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </script>

      <a href="#conteudo" className="skip-link">
        Ir para conteúdo principal
      </a>

      <div className="container-pad">
        <div className="header-shell">
          <a
            href="/"
            onClick={handleLogoClick}
            className="logo-wrap"
            aria-label="Ir para a página inicial"
          >
            <img
              src={logo}
              alt="Siingulo"
              className="logo"
              width="160"
              height="40"
              decoding="async"
            />
          </a>

          <nav className="nav" aria-label="Navegação principal">
            <a href="#sobre" className="nav-link" onClick={goTo("#sobre")}>
              Sobre nós
            </a>
            <a
              href="#diferenciais"
              className="nav-link"
              onClick={goTo("#diferenciais")}
            >
              Diferenciais
            </a>
            <a
              href="#solucoes"
              className="nav-link"
              onClick={goTo("#solucoes")}
            >
              Soluções
            </a>
            <Link
              to="/blog"
              className={`nav-link ${pathname === "/blog" ? "active" : ""}`}
              aria-current={pathname === "/blog" ? "page" : undefined}
            >
              Blog
            </Link>
          </nav>

          <div className="actions">
            <a
              href="https://w.app/siingulo_comercial"
              target="_blank"
              rel="noopener noreferrer"
              className="cta"
            >
              <span>Fale com a Siingulo</span>
              <img
                src={seta}
                alt=""
                className="cta-icon"
                width="16"
                height="16"
                loading="lazy"
              />
            </a>

            <div className="social" aria-label="Redes sociais">
              <a
                href="https://www.facebook.com/siingulo.br/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="" width="20" height="20" loading="lazy" />
              </a>
              <a
                href="https://www.instagram.com/siingulo/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="" width="20" height="20" loading="lazy" />
              </a>
              <a
                href="https://www.linkedin.com/company/siingulo"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="" width="20" height="20" loading="lazy" />
              </a>
            </div>
          </div>

          <button
            ref={triggerBtnRef}
            className={`hamburger ${open ? "is-open" : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <img
              src={open ? closeIcon : menuIcon}
              alt=""
              className="hamburger-icon"
              width="22"
              height="22"
            />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`mobile-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside
        id="mobile-panel"
        className={`mobile-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        ref={panelRef}
      >
        <div className="mobile-card">
          <div className="mobile-brand">
            <img
              src={logo}
              alt="Siingulo"
              className="mobile-logo"
              width="120"
              height="28"
            />
            <button
              className="mobile-close"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            >
              <img src={closeIcon} alt="" width="20" height="20" />
            </button>
          </div>

          <nav className="mobile-nav">
            <a href="#sobre" ref={firstFocusable} onClick={goTo("#sobre")}>
              Sobre nós
            </a>
            <a href="#diferenciais" onClick={goTo("#diferenciais")}>
              Diferenciais
            </a>
            <a href="#solucoes" onClick={goTo("#solucoes")}>
              Soluções
            </a>
            <Link to="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
          </nav>

          <a
            href="#contato"
            className="cta mobile-cta"
            onClick={goTo("#contato")}
          >
            <span>Fale com a Siingulo</span>
            <img src={seta} alt="" className="cta-icon" width="16" height="16" />
          </a>

          <div className="social mobile-social" aria-label="Redes sociais">
            <a
              href="https://www.facebook.com/siingulo.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src={facebook} alt="" width="20" height="20" loading="lazy" />
            </a>
            <a
              href="https://www.instagram.com/siingulo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src={instagram} alt="" width="20" height="20" loading="lazy" />
            </a>
            <a
              href="https://www.linkedin.com/company/siingulo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src={linkedin} alt="" width="20" height="20" loading="lazy" />
            </a>
          </div>
        </div>
      </aside>
    </header>
  );
}
