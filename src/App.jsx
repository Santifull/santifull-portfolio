
import "./styles/main.css";

function App() {
  return (
    <main className="portfolio">
      <nav className="navbar">
        <a className="logo" href="#home">
          SANTI<span>FULL</span>
          <i>.</i>
        </a>

        <div className="nav-links">
          <a href="#about">Sobre mí</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </div>

        <span className="availability">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </span>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            <span></span> IT · SYSTEMS · INFRASTRUCTURE
          </span>

          <h1>
            THINK<span>.</span>
            <br />
            BUILD<span>.</span>
            <br />
            <strong>CONNECT.</strong>
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

        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-dots">
              <i></i><i></i><i></i>
            </div>
            <span> santifull@portfolio:~ </span>
            <span className="terminal-lock">● SECURE</span>
          </div>

          <div className="terminal-body">
            <p><span className="green">root@santifull</span>:~$ whoami</p>
            <p className="terminal-output">IT Specialist & Systems Enthusiast</p>

            <p><span className="green">root@santifull</span>:~$ ls skills/</p>
            <p className="terminal-output">
              Systems/ &nbsp; Infrastructure/ &nbsp; Cloud/
              <br />
              Networking/ &nbsp; Virtualization/ &nbsp; Security/
            </p>

            <p><span className="green">root@santifull</span>:~$ status</p>
            <p className="terminal-output">
              <span className="green">●</span> Learning. Building. Improving.
            </p>

            <p className="terminal-prompt">
              <span className="green">root@santifull</span>:~$
              <span className="cursor"></span>
            </p>
          </div>
        </div>

        <div className="hero-background"></div>
        <span className="vertical-label">SANTIFULL — PERSONAL PORTFOLIO</span>
        <span className="hero-index">01 / 05</span>
      </section>
    </main>
  );
}

export default App;
