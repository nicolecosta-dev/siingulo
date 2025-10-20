import React from "react";
import "../styles/contato.css";

import marca from "../assets/logo-escala.png";
import iconFb from "../assets/facebook.png";
import iconIg from "../assets/instagram.png";
import iconIn from "../assets/linkedin.png";

export default function Contato() {
  return (
    <section id="contato" className="contato">
      <div className="contato-grid">
        {/* LADO ESQUERDO — fundo #F5F5F7 */}
        <div className="contato-left">
          <div className="contato-left-inner">
            <h2 className="contato-title">
              Pronto para
              <br />
              levar sua marca
              <br />
              a outro nível?
            </h2>

            <p className="contato-desc">
              Na Siingulo, cada projeto é tratado como único. Conecte-se com
              nosso time e descubra como podemos criar soluções estratégicas
              para o seu negócio.
            </p>

            <div className="contato-phones">
              <a href="tel:+5511930832021">(11) 93083-2021</a>
              <a href="tel:+551143841888">(11) 4384-1888</a>
            </div>

            <address className="contato-address">
              Av. Leoni Crê Bortolosso, 88
              <br />
              Galpão 6 - Quitaúna, Osasco - SP,<br />
              06186-260
            </address>

            <div className="contato-social">
              <a href="#" aria-label="Facebook">
                <img src={iconFb} alt="Facebook" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src={iconIg} alt="Instagram" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={iconIn} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
<div className="container-contato-right">
        {/* LADO DIREITO — fundo branco */}
        <div className="contato-right">
          <img src={marca} alt="Siingulo" className="contato-mark" />
          <form className="contato-form" onSubmit={(e) => e.preventDefault()}>
            <label className="field">
              <span>Nome*</span>
              <input type="text" required />
            </label>

            <label className="field">
              <span>E-mail corporativo*</span>
              <input type="email" required />
            </label>

            <label className="field">
              <span>Telefone*</span>
              <input type="tel" required placeholder="+55" />
            </label>

            <label className="field">
              <span>Mercado*</span>
              <select required defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                <option value="alimentos">Alimentos e Bebidas</option>
                <option value="farmaceutico">Farmacêutico</option>
                <option value="cosmeticos">Cosméticos e Beleza</option>
                <option value="petroquimica">Petroquímica e Química</option>
                <option value="pet">Veterinário & Pet</option>
                <option value="outros">Outros</option>
              </select>
            </label>

            <label className="field">
              <span>Mensagem*</span>
              <textarea rows="4" required></textarea>
            </label>

            <label className="field-check">
              <input type="checkbox" required />
              <span>
                Marque aqui se você aceita nossos termos. (Política de
                Privacidade)
              </span>
            </label>

            <button type="submit" className="btn-submit">
              Enviar Mensagem
            </button>

            <p className="contato-legal">
              Ao preencher um formulário em nosso site, você reconhece que seus dados pessoais serão coletados, armazenados e processados por nossa empresa. Esses dados serão usados apenas para fins de contato e gerenciamento de seu pedido ou solicitação. Garantimos que seus dados serão mantidos seguros e não serão compartilhados com terceiros sem seu consentimento expresso. Se você deseja alterar ou excluir seus dados pessoais, entre em contato conosco através dos meios fornecidos em nosso site. Ao enviar o formulário, você concorda com os termos acima mencionados.
            </p>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
}
