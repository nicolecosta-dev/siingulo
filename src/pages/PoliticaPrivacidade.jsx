// src/pages/PoliticaPrivacidade.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./politica.css";
import bgPolitica from "../assets/back-politica.png";

/* ====== SEÇÕES ====== */
const SECTIONS = [
  {
    id: "introducao",
    titulo: "Introdução",
    conteudo: `
      <p>A SIINGULO SOLUÇÕES EM IMPRESSÕES DE SEGURANÇA LTDA., inscrita no CNPJ sob o nº 16.840.903/0001-10,
      com sede na Av. Leonil Crê Bortolosso, 88 – Galpão 6 – Quitaúna, Osasco – SP, CEP 06186-260, reafirma
      seu compromisso com a transparência, a ética e o respeito à privacidade de todos que acessam seu site
      e interagem com seus canais digitais.</p>
      <br>
      <p>Valorizando a confiança dos clientes, parceiros e visitantes, a Siingulo assegura que o tratamento
      de dados pessoais é realizado de forma responsável, segura e em conformidade com a Lei Geral de
      Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).</p>
      <p>Esta Política de Privacidade tem como objetivo esclarecer como os dados pessoais são coletados,
      utilizados, armazenados e protegidos pela Siingulo, bem como informar os direitos dos titulares
      e os canais disponíveis para contato.</p>
    `,
  },
  {
    id: "informacoes-gerais",
    titulo: "Informações gerais",
    conteudo: `
      <p>Esta política aplica-se a todas as páginas, formulários e canais de contato do site institucional da Siingulo.</p>
      <p>Ao navegar e fornecer seus dados em nossos formulários, o usuário reconhece que leu, compreendeu e concorda com os termos desta Política.</p>
    `,
  },
  {
    id: "dados-coletados",
    titulo: "DADOS PESSOAIS COLETADOS E SUA UTILIZAÇÃO",
    conteudo: `
      <p>Os dados pessoais são coletados de forma direta, exclusivamente quando o usuário preenche o formulário de contato disponível no site.</p>
      <p>As informações solicitadas incluem:</p>
      <ul>
        <li>Nome</li>
        <li>E-mail corporativo</li>
        <li>Telefone</li>
        <li>Mercado (segmento)</li>
        <li>Mensagem</li>
      </ul>
      <p>Esses dados são utilizados exclusivamente para:</p>
      <ul>
        <li>Responder contatos comerciais;</li>
        <li>Enviar propostas e orçamentos;</li>
        <li>Manter comunicação institucional com potenciais clientes e parceiros.</li>
      </ul>
      <p>A Siingulo não utiliza os dados coletados para fins não previstos nesta Política e não realiza o compartilhamento de informações com terceiros não autorizados.</p>
    `,
  },
  {
    id: "tratamento-de-dados",
    titulo: "TRATAMENTO E COMPARTILHAMENTO DOS DADOS PESSOAIS",
    conteudo: `
      <p>Os dados fornecidos são armazenados com segurança e utilizados apenas pelos setores internos responsáveis pelo atendimento comercial e relacionamento com clientes.</p>
      <p>Para fins de comunicação e monitoramento de tráfego, a Siingulo utiliza:</p>
      <ul>
        <li>WhatsApp Business — para retorno e suporte comercial;</li>
        <li>Google Analytics 4 — para análise estatística de acesso e comportamento de navegação (de forma agregada e anônima).</li>
      </ul>
      <p>Não há compartilhamento de informações pessoais com terceiros, salvo em casos de obrigação legal ou mediante consentimento expresso do titular.</p>
    `,
  },
  {
    id: "seguranca",
    titulo: "SEGURANÇA DOS DADOS PESSOAIS",
    conteudo: `
      <p>A Siingulo adota medidas técnicas e administrativas adequadas para proteger os dados pessoais contra acessos não autorizados, destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.</p>
      <p>As informações são armazenadas em servidores seguros, com acesso restrito apenas a colaboradores autorizados.</p>
    `,
  },
  {
    id: "uso-de-cookies",
    titulo: "USO DE COOKIES",
    conteudo: `
      <p>O site da Siingulo utiliza cookies essenciais e analíticos para melhorar a experiência do usuário e compreender o desempenho das páginas. Os tipos de cookies utilizados incluem:</p>
      <ul>
        <li><b>Cookies essenciais:</b> necessários para o funcionamento do site.</li>
        <li><b>Cookies analíticos:</b> usados para análise de tráfego e métricas de acesso, por meio do Google Analytics 4.</li>
      </ul>
      <p>O usuário pode, a qualquer momento, configurar seu navegador para recusar cookies ou excluí-los após a navegação, sem prejuízo à utilização do site.</p>
    `,
  },
  {
    id: "politica-de-cookies",
    titulo: "POLÍTICA DE COOKIES",
    conteudo: `
      <p>Ao acessar o site da Siingulo, o usuário concorda com o uso de cookies conforme descrito nesta Política. Os cookies não armazenam informações pessoais sensíveis e são utilizados apenas para fins estatísticos e de desempenho.</p>
      <p>A Siingulo poderá atualizar periodicamente esta Política de Cookies para refletir melhorias em suas práticas e novas tecnologias utilizadas.</p>
    `,
  },
  {
    id: "alteracoes",
    titulo: "ALTERAÇÕES A ESTA POLÍTICA",
    conteudo: `
      <p>A Siingulo reserva-se o direito de atualizar ou modificar esta Política de Privacidade a qualquer momento, visando garantir maior transparência e adequação às normas legais e às práticas internas.</p>
      <p>A data da última atualização estará sempre disponível no rodapé deste documento.</p>
    `,
  },
  {
    id: "direitos-dos-titulares",
    titulo: "DIREITOS DOS TITULARES",
    conteudo: `
      <p>Nos termos da LGPD, o titular dos dados pode, a qualquer momento, solicitar:</p>
      <ul>
        <li>Acesso às informações armazenadas;</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>Exclusão ou anonimização dos dados pessoais;</li>
        <li>Revogação do consentimento.</li>
      </ul>
      <p>Essas solicitações podem ser realizadas através do e-mail
      <b> <a href="mailto:atendimento@siingulo.com.br">atendimento@siingulo.com.br</a></b>.</p>
    `,
  },
  {
    id: "responsavel",
    titulo: "RESPONSÁVEL PELO TRATAMENTO DE DADOS",
    conteudo: `
      <p>A Siingulo designou um Encarregado de Proteção de Dados (DPO) responsável por supervisionar a conformidade com a LGPD e atender solicitações dos titulares.</p>
      <p><b><a href="mailto:juridico@siingulo.com.br">juridico@siingulo.com.br</a></b></p>
    `,
  },
  {
    id: "contato",
    titulo: "CONTATO",
    conteudo: `
      <p>Para dúvidas, solicitações ou informações adicionais sobre esta Política de Privacidade e Proteção de Dados, entre em contato conosco:</p>
      <p><b><a href="mailto:atendimento@siingulo.com.br">atendimento@siingulo.com.br</a></b></p>
    `,
  },
];

export default function PoliticaPrivacidade() {
  // começa com a primeira aberta
  const [openId, setOpenId] = useState(SECTIONS[0].id);

  // abre via hash se existir
  useEffect(() => {
    const fromHash = window.location.hash ? window.location.hash.slice(1) : "";
    if (fromHash && SECTIONS.some((s) => s.id === fromHash)) {
      setOpenId(fromHash);
      requestAnimationFrame(() => {
        const el = document.getElementById(fromHash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // atualiza se o hash mudar
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash ? window.location.hash.slice(1) : "";
      if (SECTIONS.some((s) => s.id === id)) {
        setOpenId(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // TOGGLE: abre a clicada; se clicar de novo na mesma, FECHA (pode ficar tudo fechado)
  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <main className="pp">
        <section
          className="pp-top"
          style={{
            "--hero-politica": `url(${bgPolitica})`,
            marginTop: "-16px",
          }}
        >
          <Header />

          <div className="pp-hero">
            <div className="pp-hero-inner">
              <h1 className="pp-title">PDP</h1>
              <p className="pp-sub">
                Política de Privacidade e Proteção de Dados
              </p>
            </div>
          </div>
        </section>

        <section className="pp-content container">
          <div
            className="pp-accordion"
            role="tablist"
            aria-label="Política de Privacidade"
          >
            {SECTIONS.map((sec) => {
              const isOpen = openId === sec.id;
              return (
                <article
                  key={sec.id}
                  id={sec.id}
                  className={`pp-item ${isOpen ? "is-open" : ""}`}
                >
                  <h2 className="pp-item-title">
                    <button
                      className="pp-trigger"
                      role="tab"
                      aria-expanded={!!isOpen}
                      aria-controls={`panel-${sec.id}`}
                      onClick={() => toggleItem(sec.id)}
                    >
                      <span>{sec.titulo}</span>
                      <svg
                        className="chev"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </h2>

                  <div
                    id={`panel-${sec.id}`}
                    role="region"
                    aria-labelledby={sec.id}
                    className="pp-panel"
                    hidden={!isOpen}
                  >
                    <div
                      className="pp-panel-inner"
                      dangerouslySetInnerHTML={{ __html: sec.conteudo }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
