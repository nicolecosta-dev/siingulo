// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import SobreNos from "./components/SobreNos.jsx";
import Diferenciais from "./components/Diferenciais.jsx";
import Setores from "./components/Setores.jsx";
import Solucoes from "./components/Solucoes.jsx";
import Blog from "./components/Blog.jsx"; // seção de blog na home, se quiser manter
import HeroEscala from "./components/HeroEscala.jsx";
import Contato from "./components/Contato.jsx";
import Footer from "./components/Footer.jsx";

import BlogList from "./pages/BlogList.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade.jsx";

export default function App() {
  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-white text-gray-900">
            <Hero />
            <SobreNos />
            <Diferenciais />
            <Setores />
            <Solucoes />
            <Blog />
            <HeroEscala />
            <Contato />
            <Footer />
          </div>
        }
      />

      {/* BLOG */}
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* POLÍTICA */}
      <Route path="/politica" element={<PoliticaPrivacidade />} />
    </Routes>
  );
}
