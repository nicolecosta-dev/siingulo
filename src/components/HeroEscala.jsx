import React from "react";
import "../styles/heroEscala.css";

import bgEscala from "../assets/background-escala.png";
import logoEscala from "../assets/logo-escala.png";

export default function HeroEscala() {
  return (
    <section
      id="hero-escala"
      className="hero-escala"
      style={{ backgroundImage: `url(${bgEscala})` }}
    >
      <div className="hero-overlay">
        <img
          src={logoEscala}
          alt="Logo Siingulo Escala"
          className="hero-logo"
        />
        <h1 className="hero-text">
          Escala, tecnologia e confiança para líderes da indústria
        </h1>
      </div>
    </section>
  );
}
