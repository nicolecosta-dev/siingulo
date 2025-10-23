import React from "react";
import { Link } from "react-scroll";
import { HashLink } from "react-router-hash-link";
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
            <li className="hover-bubble">
              <HashLink smooth to="/#sobre">
                Sobre nós
              </HashLink>
            </li>
            <li className="hover-bubble">
              <HashLink smooth to="/#diferenciais">
                Diferenciais
              </HashLink>
            </li>
            <li className="hover-bubble">
              <HashLink smooth to="/#solucoes">
                Soluções
              </HashLink>
            </li>
            <li className="hover-bubble">
              <HashLink smooth to="/#blog">
                Blog
              </HashLink>
            </li>
            <li className="hover-bubble">
              <HashLink smooth to="/#contato">
                Contato
              </HashLink>
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
          {/* Política */}
          <HashLink className="footer-privacy hover-bubble" to="/politica">
            _Política de Privacidade
          </HashLink>

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
