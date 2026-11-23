import { useState } from "react";
import "./styles/main.css";
import HeroScene from "./scenes/HeroScene";
import TechnologyStack from "./components/TechnologyStack";
import Projects from "./sections/Projects";
import GlobalSearch from "./components/GlobalSearch";

function App() {
  const [technologySearchQuery, setTechnologySearchQuery] = useState("");

  return (
    <main className="portfolio">
      <nav className="navbar">
        <a className="logo" href="#home">
          SANTI<span>FULL</span><i>.</i>
        </a>

        <div className="nav-links">
          <a href="#about">Sobre mí</a>
          <a href="#technologies">Tecnologías</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </div>

        <GlobalSearch
          onTechnologySelect={(technologyName) =>
            setTechnologySearchQuery(technologyName)
          }
        />

        <span className="availability">
          <span className="status-light"></span>
          SISTEMA ONLINE
        </span>
      </nav>

      {/* PRESENTACIÓN */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            <span></span> INFORMÁTICA · SISTEMAS · INFRAESTRUCTURA
          </span>

          <h1>
            PIENSA<span>.</span>
            <br />
            CONSTRUYE<span>.</span>
            <br />
            <strong>CONECTA.</strong>
          </h1>

          <p className="hero-description">
            Construyendo, administrando y conectando sistemas.
            Explorando el mundo de la infraestructura IT,
            la tecnología y la innovación.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="button-primary">
              EXPLORAR PROYECTOS <span>↗</span>
            </a>
            <a href="#about" className="button-secondary">
              CONOCERME
            </a>
          </div>
        </div>

        <div className="hero-visuals">
          <div className="hero-3d">
            <HeroScene />
          </div>

          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <i></i><i></i><i></i>
              </div>
              <span>santifull@portfolio:~</span>
              <span className="terminal-lock">● SEGURO</span>
            </div>

            <div className="terminal-body">
              <p>
                <span className="green">root@santifull</span>:~$ whoami
              </p>
              <p className="terminal-output">
                Especialista IT y entusiasta de los sistemas
              </p>

              <p>
                <span className="green">root@santifull</span>:~$ ls skills/
              </p>
              <p className="terminal-output">
                Sistemas/ &nbsp; Infraestructura/ &nbsp; Cloud/
                <br />
                Redes/ &nbsp; Virtualización/ &nbsp; Seguridad/
              </p>

              <p>
                <span className="green">root@santifull</span>:~$ status
              </p>
              <p className="terminal-output">
                <span className="green">●</span> Aprendiendo. Construyendo. Mejorando.
              </p>

              <p className="terminal-prompt">
                <span className="green">root@santifull</span>:~$
                <span className="cursor"></span>
              </p>
            </div>
          </div>
        </div>

        <div className="hero-background"></div>

        <span className="vertical-label">
          SANTIFULL — PORTFOLIO PERSONAL
        </span>

        <span className="hero-index">01 / 05</span>
      </section>

      {/* SOBRE MÍ */}
      <section className="about-section" id="about">
        <div className="about-container">

          <div className="about-heading">
            <span className="section-label">
              <span></span> 02 — SOBRE MÍ
            </span>

            <h2>
              DETRÁS DE LOS
              <br />
              <span>SISTEMAS.</span>
            </h2>

            <p className="about-intro">
              La tecnología no consiste únicamente en hacer que
              las cosas funcionen. Consiste en entender cómo
              funcionan, mejorar lo que existe y encontrar
              nuevas formas de construir.
            </p>

            <p className="about-description">
              Soy un profesional del ámbito IT con experiencia
              en soporte técnico, entornos corporativos e
              infraestructura tecnológica. Me interesa
              especialmente el mundo de los sistemas, la
              virtualización, las redes y las soluciones
              basadas en tecnología.
            </p>

            <p className="about-description">
              Fuera del entorno profesional, experimento con
              mi propio laboratorio tecnológico, donde pongo
              en práctica nuevas herramientas, despliego
              servicios y construyo proyectos reales.
            </p>

            <div className="about-signature">
              <span className="signature-line"></span>
              <span>PIENSA · EXPLORA · CREA</span>
            </div>
          </div>

          <div className="about-cards">

            <article className="about-card">
              <span className="card-number">01</span>
              <div className="about-card-icon">⌘</div>
              <h3>SOPORTE INFORMÁTICO</h3>
              <p>
                Soporte técnico especializado, resolución
                de incidencias y asistencia a usuarios
                en entornos corporativos.
              </p>
              <span className="card-tag">SOPORTE · RESOLUCIÓN DE INCIDENCIAS</span>
            </article>

            <article className="about-card">
              <span className="card-number">02</span>
              <div className="about-card-icon">⌬</div>
              <h3>SISTEMAS E INFRAESTRUCTURA</h3>
              <p>
                Administración de sistemas, despliegue
                de equipos, virtualización, redes y
                servicios tecnológicos.
              </p>
              <span className="card-tag">SISTEMAS · REDES · CLOUD</span>
            </article>

            <article className="about-card">
              <span className="card-number">03</span>
              <div className="about-card-icon">⟁</div>
              <h3>HOMELAB Y AUTOMATIZACIÓN</h3>
              <p>
                Experimentación con Docker, servicios
                autohospedados, monitorización y
                automatización de infraestructura.
              </p>
              <span className="card-tag">DOCKER · SELF-HOSTING · CLOUD</span>
            </article>

          </div>
        </div>

        <div className="about-footer">
          <span>SANTIFULL / PORTFOLIO PERSONAL</span>
          <span>02 — 05</span>
        </div>
      </section>

      {/* TECNOLOGÍAS */}
      <TechnologyStack externalSearchQuery={technologySearchQuery} />

      {/* PROYECTOS */}
      <Projects />
    </main>
  );
}

export default App;
