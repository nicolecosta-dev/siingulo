import React from "react";
import { Link } from "react-scroll";
import "../styles/footer.css";

import bgMarca from "../assets/logo-footer-laranja.png";
import logoBranca from "../assets/logo-branca-footer.png";
import logoCothy from "../assets/logo-cothy.png";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <img className="footer-bg" src={bgMarca} alt="" aria-hidden="true" />

      <div className="footer-inner">
        {/* Coluna esquerda */}
        <div className="footer-col left">
          <img className="footer-logo" src={logoBranca} alt="Siingulo" />
        </div>

        {/* Coluna central */}
        <nav className="footer-col nav-footer" aria-label="Rodapé">
          <ul>
            <li>
              <Link to="sobre" smooth={true} duration={600} offset={-80}>
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="diferenciais" smooth={true} duration={600} offset={-80}>
                Diferenciais
              </Link>
            </li>
            <li>
              <Link to="solucoes" smooth={true} duration={600} offset={-80}>
                Soluções
              </Link>
            </li>
            <li>
              <Link to="blog" smooth={true} duration={600} offset={-80}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="contato" smooth={true} duration={600} offset={-80}>
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        {/* Coluna direita */}
        <div className="footer-col right">
          <h3 className="footer-headline">
            Transformamos <br />
            ideias em <span>soluções</span> <br />
            <strong>únicas</strong>
          </h3>

          <a className="footer-privacy" href="/politica">
            _Política de Privacidade
          </a>

          <p className="footer-copy">
            Copyright©2025 - Todos os direitos reservados
            <br />
            para Siingulo
          </p>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <span>Desenvolvido por</span>
        <img className="footer-cothy" src={logoCothy} alt="Cothy" />
      </div>
    </footer>
  );
}
