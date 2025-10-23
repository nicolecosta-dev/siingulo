import React from "react";
import "../styles/diferenciais.css";

import img1 from "../assets/tecnologia-integrada.png"; // topo: col 2
import img2 from "../assets/parceria-estrategica.png"; // 2ª linha: col 1
import img3 from "../assets/personalizacao-real.png"; // 2ª linha: col 3
import img4 from "../assets/seguranca-avancada.png"; // topo: col 4 (imagem)

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="diferenciais">
      <div className="container-diferenciais">
        <p className="diferenciais-subtitulo subtitulo">DIFERENCIAIS</p>
        <h2 className="diferenciais-titulo">
          Você imagina, a <span>Siingulo faz.</span>
        </h2>
        <hr className="diferenciais-linha" />

        <div className="cards-grid cards-grid--4">
          {/* 1ª linha (4 colunas) */}
          <div className="card-texto area-a">
            <h3>TECNOLOGIA INTEGRADA</h3>
            <p>
              Flexografia e impressão digital reunidas em uma mesma estrutura,
              garantindo versatilidade, qualidade superior e eficiência em todas
              as demandas de produção.
            </p>
          </div>

          <div className="card-imagem area-b">
            <img src={img1} alt="Linha de produção" />
          </div>

          <div className="card-texto area-c">
            <h3>PARCERIA ESTRATÉGICA</h3>
            <p>
              Mais do que fornecedores, atuamos como parceiros de longo prazo,
              oferecendo suporte técnico e soluções que agregam valor ao
              negócio.
            </p>
          </div>

          <div className="card-imagem area-d">
            <img src={img4} alt="Equipamentos industriais" />
          </div>

          {/* 2ª linha (4 colunas) */}
          <div className="card-imagem area-e">
            <img src={img2} alt="Equipamentos industriais 2" />
          </div>

          <div className="card-texto area-f">
            <h3>PERSONALIZAÇÃO REAL</h3>
            <p>
              Soluções sob medida, com dados variáveis e acabamentos premium
              para fortalecer a identidade da sua marca.
            </p>
          </div>

          <div className="card-imagem area-g">
            <img src={img3} alt="Bobinas e impressões" />
          </div>

          <div className="card-texto area-h">
            <h3>SEGURANÇA AVANÇADA</h3>
            <p>
              Reconhecida nacionalmente em impressos de segurança, com
              tecnologias antifalsificação e rastreabilidade total.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
