import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const navigate = useNavigate();

  // sombra ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // trava body quando menu abre
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      // foca no primeiro link do menu
      setTimeout(() => firstFocusable.current?.focus(), 50);
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  // altura do header -> --header-h
  useEffect(() => {
    const setHeaderVar = () => {
      const h = headerRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setHeaderVar();
    window.addEventListener("resize", setHeaderVar);
    const ro = new ResizeObserver(setHeaderVar);
    if (headerRef.current) ro.observe(headerRef.current);
    document.fonts?.ready?.then(setHeaderVar).catch(() => {});
    return () => {
      window.removeEventListener("resize", setHeaderVar);
      ro.disconnect();
    };
  }, [open]);

  // ESC fecha
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/");
    requestAnimationFrame(() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  };

  // helper p/ links de âncora (fecha o menu e faz scroll suave)
  const goTo = (hash) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <header
      ref={headerRef}
      className={`app-header ${scrolled ? "is-scrolled" : ""} ${
        open ? "menu-open" : ""
      }`}
    >
      <div className="container-pad">
        <div className="header-shell">
          <a
            href="/"
            onClick={handleLogoClick}
            className="logo-wrap"
            aria-label="Ir para a página inicial"
          >
            <img src={logo} alt="Siingulo" className="logo" />
          </a>

          <nav className="nav" aria-label="Principal">
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
            <Link to="/blog" className="nav-link">
    Blog
  </Link>
          </nav>

          <div className="actions">
            <a
              href="https://w.app/siingulo_comercial"
              target="_blank"
              rel="noreferrer"
              className="cta"
            >
              <span>Fale com a Siingulo</span>
              <img src={seta} alt="" className="cta-icon" />
            </a>
            <div className="social">
              <a
                href="https://www.facebook.com/siingulo.br/"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebook} alt="" />
              </a>
              <a
                href="https://www.instagram.com/siingulo/"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagram} alt="" />
              </a>
              <a
                href="https://www.linkedin.com/company/siingulo"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedin} alt="" />
              </a>
            </div>
          </div>

          <button
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
            />
          </button>
        </div>
      </div>

      {/* Mantém montado para animar entrada/saída */}
      <div
        className={`mobile-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        id="mobile-panel"
        className={`mobile-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="mobile-card">
          <div className="mobile-brand">
  <img src={logo} alt="Siingulo" className="mobile-logo" />

  <button
    className="mobile-close"
    aria-label="Fechar menu"
    onClick={() => setOpen(false)}
  >
    <img src={closeIcon} alt="Fechar" />
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
            <a href="#blog" onClick={goTo("#blog")}>
              Blog
            </a>
          </nav>

          <a
            href="#contato"
            className="cta mobile-cta"
            onClick={goTo("#contato")}
          >
            <span>Fale com a Siingulo</span>
            <img src={seta} alt="" className="cta-icon" />
          </a>

          <div className="social mobile-social">
            <a
              href="https://www.facebook.com/siingulo.br/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img src={facebook} alt="" />
            </a>
            <a
              href="https://www.instagram.com/siingulo/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src={instagram} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/company/siingulo"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img src={linkedin} alt="" />
            </a>
          </div>
        </div>
      </aside>
    </header>
  );
}
