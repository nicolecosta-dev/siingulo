import React, { useEffect, useRef, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { initHoverBubble } from "./lib/hoverBubble";
import Seo from "./seo/Seo";

import Hero from "./components/Hero.jsx";

const SobreNos = lazy(() => import("./components/SobreNos.jsx"));
const Diferenciais = lazy(() => import("./components/Diferenciais.jsx"));
const Setores = lazy(() => import("./components/Setores.jsx"));
const Solucoes = lazy(() => import("./components/Solucoes.jsx"));
const BlogHome = lazy(() => import("./components/Blog.jsx"));
const HeroEscala = lazy(() => import("./components/HeroEscala.jsx"));
const Contato = lazy(() => import("./components/Contato.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

// Páginas/rotas dedicadas
const BlogList = lazy(() => import("./pages/BlogList.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const PoliticaPrivacidade = lazy(() =>
  import("./pages/PoliticaPrivacidade.jsx")
);

const Void = () => <div style={{ minHeight: 1 }} />;

export default function App() {
  const hoverInitRef = useRef(false);

  useEffect(() => {
    if (hoverInitRef.current) return;
    hoverInitRef.current = true;

    let dispose;
    if (typeof window !== "undefined") {
      dispose = initHoverBubble();
    }
    return () => {
      dispose && dispose();
      hoverInitRef.current = false;
    };
  }, []);

  const base = "https://www.seudominio.com.br";
  const homeDesc =
    "A Siingulo é referência em tecnologia de impressão digital, oferecendo rótulos, ingressos e outros impressos personalizados com dados variáveis e medidas de segurança avançadas. Com a plataforma Siingulo WEB B2B, encomendar online é simples e eficiente, sem grandes volumes mínimos e com prazos otimizados.";

  return (
    <Routes>
      {/* HOME (one-page composta por seções) */}
      <Route
        path="/"
        element={
          <>
            <Seo
              title="Siingulo — Impressão digital, rótulos e ingressos com segurança avançada"
              description={homeDesc}
              canonical={`${base}/`}
              image={`${base}/og/og-image.jpg`}
              jsonLd={{
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Siingulo",
                url: base,
                logo: `${base}/og/logo.png`,
                sameAs: [
                  "https://www.facebook.com/siingulo.br/",
                  "https://www.instagram.com/siingulo/",
                  "https://www.linkedin.com/company/siingulo",
                ],
              }}
            />

            {/* conteúdo da home */}
            <div className="min-h-screen bg-white text-gray-900">
              <Hero />

              {/* main para o skip-link (#conteudo) */}
              <main id="conteudo">
                <Suspense fallback={<Void />}>
                  <SobreNos />
                </Suspense>
                <Suspense fallback={<Void />}>
                  <Diferenciais />
                </Suspense>
                <Suspense fallback={<Void />}>
                  <Setores />
                </Suspense>
                <Suspense fallback={<Void />}>
                  <Solucoes />
                </Suspense>
                <Suspense fallback={<Void />}>
                  <BlogHome />
                </Suspense>
                <Suspense fallback={<Void />}>
                  <HeroEscala />
                </Suspense>
                <Suspense fallback={<Void />}>
                  <Contato />
                </Suspense>
              </main>

              <Suspense fallback={<Void />}>
                <Footer />
              </Suspense>
            </div>
          </>
        }
      />

      {/* BLOG */}
      <Route
        path="/blog"
        element={
          <Suspense fallback={<Void />}>
            <BlogList />
          </Suspense>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <Suspense fallback={<Void />}>
            <BlogPost />
          </Suspense>
        }
      />

      {/* POLÍTICA DE PRIVACIDADE */}
      <Route
        path="/politica"
        element={
          <Suspense fallback={<Void />}>
            <PoliticaPrivacidade />
          </Suspense>
        }
      />

      {/* Fallback — redireciona qualquer rota inválida para a home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
