import { useEffect, useRef, useState, cloneElement } from "react";
import {
  Film,
  Server,
  ShieldCheck,
  Users,
  MessageCircle,
  BookOpen,
  Cloud,
  Monitor,
  HardDrive,
  Network,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Layers3,
  Database,
  Globe,
  LockKeyhole,
  Headphones,
  LifeBuoy,
  Workflow,
} from "lucide-react";

import "../styles/projects.css";

/* =====================================================
   ANIMACIÓN DE APARICIÓN AL HACER SCROLL
===================================================== */


const EMBY_STATS_URL =
  "https://santifull-emby-stats.santiagomartinmendoza02.workers.dev/stats";

  function CountUp({ value, decimals = 0 }) {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let frame;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;

        startedRef.current = true;
        observer.disconnect();

        const duration = 1600;
        const startTime = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);

          setCurrent(value * eased);

          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          } else {
            setCurrent(value);
          }
        };

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <strong ref={elementRef}>
      {new Intl.NumberFormat("es-ES", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(current)}
    </strong>
  );
}

function LiveEmbyStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const response = await fetch(EMBY_STATS_URL);

        if (!response.ok) {
          throw new Error("No se pudieron cargar las estadísticas");
        }

        const data = await response.json();

        if (active) {
          setStats(data);
          setError(false);
        }
      } catch {
        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="emby-stats-message">Cargando estadísticas...</p>;
  }

  if (error || !stats) {
    return (
      <p className="emby-stats-message">
        Las estadísticas no están disponibles en este momento.
      </p>
    );
  }

  const number = (value, decimals = 0) =>
    new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value ?? 0);
  const playbackHours = stats.playback.totalHours;
  const playbackDays = playbackHours / 24;
  const playbackMonths = playbackHours / (24 * 30.44);


  const groups = [
    {
      title: "Cine y televisión",
      items: [
        { label: "Películas", value: stats.catalog.movies, icon: Film },
        { label: "Series", value: stats.catalog.series, icon: Layers3 },
        { label: "Episodios", value: stats.catalog.episodes, icon: Monitor },
      ],
    },
    {
      title: "Contenido musical",
      items: [
        { label: "Canciones", value: stats.catalog.songs, icon: Headphones },
        { label: "Álbumes", value: stats.catalog.albums, icon: Database },
        { label: "Vídeos musicales", value: stats.catalog.musicVideos, icon: Film },
      ],
    },
    {
      title: "Comunidad y actividad",
      items: [
        { label: "Cuentas", value: stats.accounts, icon: Users },
        { label: "Usuarios históricos", value: stats.playback.historicalUsers, icon: Users },
        { label:<>Usuarios activos<br />(6 meses)</>,value:stats.playback.activeUsers6Months,icon:Workflow },
        {
  label: "Horas de reproducción",
  value: playbackHours,
  decimals: 1,
  detail: `≈ ${number(playbackDays)} días · ${number(playbackMonths, 1)} meses`,
  icon: Clock3, },
      ],
    },
  ];

  return (
    <div className="emby-live-stats">
      {groups.map((group) => (
        <div className="emby-stats-group" key={group.title}>
          <h3>{group.title}</h3>

          <div className="project-metrics">
            {group.items.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="project-metric" key={`${group.title}-${index}`}>
                  <Icon />
                  <CountUp
  value={item.value}
  decimals={item.decimals ?? 0}
/>
<span>{item.label}</span>

{item.detail && (
  <small className="project-metric-detail">
    {item.detail}
  </small>
)}
                </div>
              );
            })}
          </div>
        </div>
      ))}

            <div className="emby-stats-footer">
        <span className="emby-status-line">
          Estado registrado:
          <strong>
            {stats.serverOnline ? "En línea" : "Sin conexión"}
          </strong>

          <i
            className={`emby-status-led ${
              stats.serverOnline ? "online" : "offline"
            }`}
          />
        </span>

        <span className="emby-updated-line">
          Actualizado:
          <strong>
            {(() => {
              const date = new Date(stats.lastUpdated);
              const day = date.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              });
              const time = date.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return `${day} a las ${time}`;
            })()}
          </strong>
        </span>
      </div>
    </div>
  );
}


function Reveal({ children, delay = 0 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return cloneElement(children, {
    ref: elementRef,
    className: `${children.props.className || ""} scroll-reveal`,
    style: {
      ...children.props.style,
      "--reveal-delay": `${delay}ms`,
    },
  });
}

/* =====================================================
   DATOS DEL PROYECTO
===================================================== */

const metrics = [
  {
    value: "50",
    label: "Cuentas creadas",
    detail: "Aproximadamente",
    icon: Users,
  },
  {
    value: "30",
    label: "Usuarios reales",
    detail: "Estimación actual",
    icon: Users,
  },
  {
    value: "10–15",
    label: "Usuarios habituales",
    detail: "Actividad recurrente estimada",
    icon: ActivityIcon,
  },
  {
    value: "24/7",
    label: "Servicio permanente",
    detail: "Funcionamiento automatizado",
    icon: Clock3,
  },
];

const architecture = [
  {
    icon: Monitor,
    title: "Servidor principal",
    description:
      "Equipo con Intel N100, 16 GB de RAM y Windows 10. Emby se ejecuta directamente sobre el sistema anfitrión.",
    tags: ["Intel N100", "16 GB RAM", "Windows 10"],
  },
  {
    icon: HardDrive,
    title: "Almacenamiento",
    description:
      "Biblioteca multimedia distribuida en dos unidades principales, organizadas según el tipo de contenido y su uso.",
    tags: ["500 GB SSD", "1 TB", "8 TB"],
  },
  {
    icon: Layers3,
    title: "Virtualización",
    description:
      "VMware Workstation Pro permite separar servicios y experimentar con entornos Linux y soluciones Docker.",
    tags: ["VMware", "Ubuntu 24.04", "Docker"],
  },
  {
    icon: Network,
    title: "Red y conectividad",
    description:
      "Conexión de fibra simétrica, router principal, router secundario y switch para distribuir los dispositivos de la red.",
    tags: ["1 Gbps", "Red local", "WOL"],
  },
];

const security = [
  {
    icon: Cloud,
    title: "Cloudflare",
    description:
      "Capa de protección y gestión del tráfico web, con reglas geográficas y configuración DNS.",
  },
  {
    icon: Globe,
    title: "Nginx Proxy Manager",
    description:
      "Proxy inverso para centralizar la publicación de servicios y gestionar certificados Let's Encrypt.",
  },
  {
    icon: ShieldCheck,
    title: "CrowdSec y Fail2Ban",
    description:
      "Herramientas de detección y bloqueo de comportamientos sospechosos en los entornos virtualizados.",
  },
  {
    icon: LockKeyhole,
    title: "Firewall y controles de acceso",
    description:
      "Reglas adicionales en el firewall de Windows y listas de control de acceso en determinados servicios.",
  },
  {
    icon: Network,
    title: "Tailscale",
    description:
      "Acceso remoto privado para tareas de administración sin tener que publicar todos los servicios.",
  },
];

const userServices = [
  {
    icon: Film,
    title: "Emby",
    description:
      "Acceso a películas, series, música, conciertos y colecciones personalizadas desde distintos dispositivos.",
  },
  {
    icon: MessageCircle,
    title: "Chatwoot",
    description:
      "Canal de comunicación y atención para resolver dudas e incidencias de los usuarios.",
  },
  {
    icon: BookOpen,
    title: "Centro de ayuda",
    description:
      "Documentación y guías para facilitar el acceso y explicar el funcionamiento de la plataforma.",
  },
  {
    icon: Headphones,
    title: "Solicitudes de contenido",
    description:
      "Formulario para proponer películas, series y otros contenidos que se puedan incorporar a la biblioteca.",
  },
];

const technologies = [
  "Emby",
  "Plex",
  "Windows 10",
  "VMware Workstation Pro",
  "Ubuntu 24.04 LTS",
  "Docker",
  "Portainer",
  "Nginx Proxy Manager",
  "Cloudflare",
  "CrowdSec",
  "Fail2Ban",
  "Tailscale",
  "Chatwoot",
];

const milestones = [
  {
    number: "01",
    title: "Los comienzos con Plex",
    description:
      "Todo empezó con Plex. Fue el primer paso para crear una biblioteca multimedia propia y compartirla con familiares y amigos.",
    detail:
      "La experiencia me permitió descubrir el potencial de tener un servidor multimedia accesible desde distintos dispositivos.",
    tags: ["Plex", "Primer servidor", "Acceso remoto"],
  },
  {
    number: "02",
    title: "El salto a Emby",
    description:
      "Buscando una alternativa que encajara mejor con lo que necesitaba, descubrí Emby y decidí migrar el proyecto.",
    detail:
      "Empecé a personalizar la biblioteca, organizar el contenido y mejorar la experiencia de quienes utilizaban el servicio.",
    tags: ["Emby", "Biblioteca multimedia", "Personalización"],
  },
  {
    number: "03",
    title: "Virtualización y Linux",
    description:
      "El proyecto fue creciendo y empecé a separar servicios mediante máquinas virtuales, dando el salto a Ubuntu.",
    detail:
      "VMware Workstation Pro y Docker abrieron la puerta a experimentar con nuevos servicios y aprender a administrar entornos diferentes.",
    tags: ["VMware", "Ubuntu", "Docker", "Portainer"],
  },
  {
    number: "04",
    title: "Infraestructura y seguridad",
    description:
      "La exposición inicial de servicios directamente a Internet me llevó a prestar mucha más atención a la seguridad.",
    detail:
      "Incorporé Cloudflare, Nginx Proxy Manager, CrowdSec, Fail2Ban y controles adicionales para mejorar la protección y la gestión del acceso.",
    tags: ["Cloudflare", "NPM", "CrowdSec", "Fail2Ban"],
  },
  {
    number: "05",
    title: "Atención y experiencia de usuario",
    description:
      "El proyecto dejó de ser únicamente un servidor multimedia y empezó a convertirse en un pequeño ecosistema de servicios.",
    detail:
      "Añadí un centro de ayuda, formularios de solicitudes y un canal de soporte para que los usuarios pudieran comunicar sus necesidades.",
    tags: ["Chatwoot", "Centro de ayuda", "Soporte"],
  },
];

/* =====================================================
   ICONO PARA LAS MÉTRICAS
===================================================== */

function ActivityIcon(props) {
  return <Workflow {...props} />;
}

/* =====================================================
   CABECERA DE LA SECCIÓN
===================================================== */

function ProjectHeader() {
  return (
    <div className="projects-header">
      <span className="section-eyebrow">04 — PROYECTOS</span>

      <h2>
        IDEAS QUE SE CONVIERTEN
        <br />
        <span>EN SISTEMAS.</span>
      </h2>

      <p>
        Proyectos personales donde experimento, aprendo y convierto
        ideas en soluciones reales.
      </p>

      <div className="projects-header-line">
        <span>01 PROYECTO DESTACADO</span>
        <span>EXPERIMENTACIÓN · INFRAESTRUCTURA · EXPERIENCIA</span>
      </div>
    </div>
  );
}

/* =====================================================
   TARJETA PRINCIPAL
===================================================== */

function ProjectCard() {
  return (
    <Reveal>
      <article id="project-videoteca" className="project-main-card">
        <div className="project-cover">
          <div className="project-cover-grid" />
          <div className="project-cover-glow" />

          <div className="project-cover-top">
            <span className="project-cover-label">
              PROYECTO PERSONAL
            </span>

            <span className="project-live">
              <i />
              EN FUNCIONAMIENTO
            </span>
          </div>

          <div className="project-cover-center">
            <div className="project-cover-icon">
              <Film size={42} strokeWidth={1.3} />
            </div>

            <span className="project-cover-overline">
              PERSONAL MEDIA ECOSYSTEM
            </span>

            <h3>VIDEOTECA</h3>
            <h3 className="project-cover-purple">SANTIFULL</h3>

            <p>Tu contenido. Tu espacio. Tu experiencia.</p>
          </div>

          <div className="project-cover-bottom">
            <span>SELF-HOSTED MEDIA SERVER</span>
            <span>EVOLUCIÓN CONTINUA</span>
          </div>
        </div>

        <div className="project-main-info">
          <div className="project-main-title">
            <div>
              <span className="project-category">
                MULTIMEDIA · HOMELAB · SELF-HOSTED
              </span>

              <h3>EMBY - Videoteca Santi</h3>
            </div>

            <span className="project-evolving">
              <i />
              TERMINADO Y EN EVOLUCIÓN
            </span>
          </div>

          <p>
            Un servidor multimedia personal que nació como una
            alternativa para compartir contenido y que ha ido
            creciendo hasta convertirse en un ecosistema propio.
          </p>

          <p>
            Gestiono la biblioteca, la infraestructura, la seguridad
            y los servicios de atención. Pero hay algo que sigue
            siendo lo más importante: que quienes lo utilizan
            disfruten de la experiencia.
          </p>

          <LiveEmbyStats />
        </div>
      </article>
    </Reveal>
  );
}


/* =====================================================
   ARQUITECTURA
===================================================== */

function ProjectArchitecture() {
  return (
    <div id="project-architecture" className="project-subsection">
      <div className="project-subheading">
        <span>INFRAESTRUCTURA</span>
        <h3>La tecnología que hay detrás.</h3>
        <p>
          Una arquitectura doméstica que combina hardware,
          virtualización, almacenamiento y conectividad.
        </p>
      </div>

      <div className="architecture-grid">
        {architecture.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.title} delay={index * 110}>
              <article className="architecture-card">
                <div className="architecture-icon">
                  <Icon size={22} />
                </div>

                <h4>{item.title}</h4>
                <p>{item.description}</p>

                <div className="architecture-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* =====================================================
   SEGURIDAD
===================================================== */

function ProjectSecurity() {
  return (
    <div id="project-security" className="project-security-section">
      <div className="project-security-intro">
        <div className="project-security-heading">
          <span>SEGURIDAD Y ACCESO</span>
          <h3>Proteger también forma parte del proyecto.</h3>
        </div>

        <p>
          Uno de los mayores aprendizajes ha sido entender que
          publicar servicios en Internet implica asumir
          responsabilidades. La seguridad ha ido evolucionando
          a base de investigación, pruebas y mejoras.
        </p>
      </div>

      <div className="security-grid">
        {security.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.title} delay={index * 100}>
              <article className="security-item">
                <div className="security-icon">
                  <Icon size={21} />
                </div>

                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>

                <CheckCircle2 className="security-check" size={17} />
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="security-note">
        <ShieldCheck size={20} />
        <p>
          La seguridad no es algo que se configura una vez:
          es un proceso continuo de revisión y mejora.
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   EXPERIENCIA DE USUARIO
===================================================== */

function ProjectUserExperience() {
  return (
    <div id="project-experience" className="project-subsection">
      <div className="project-subheading">
        <span>EXPERIENCIA DE USUARIO</span>
        <h3>No se trata solo de que funcione.</h3>
        <p>
          También importa cómo se utiliza, cómo se solicita ayuda
          y cómo se comunican las necesidades.
        </p>
      </div>

      <div className="user-services-grid">
        {userServices.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.title} delay={index * 110}>
              <article className="user-service-card">
                <div className="user-service-icon">
                  <Icon size={23} />
                </div>

                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="project-user-quote">
          <span className="quote-mark">“</span>

          <p>
            La tecnología también consiste en hacer disfrutar
            a los demás.
          </p>

          <span className="quote-author">
            FILOSOFÍA DEL PROYECTO · SANTIFULL
          </span>
        </div>
      </Reveal>
    </div>
  );
}

/* =====================================================
   EVOLUCIÓN DEL PROYECTO
===================================================== */

function ProjectEvolution() {
  return (
    <div id="project-evolution" className="project-subsection evolution-section">
      <div className="project-subheading">
        <span>04 — EVOLUCIÓN</span>
        <h3>Un proyecto que ha crecido conmigo.</h3>
        <p>
          Cada etapa ha incorporado nuevas herramientas,
          conocimientos y posibilidades.
        </p>
      </div>

      <div className="project-timeline">
        {milestones.map((milestone, index) => (
          <Reveal key={milestone.number} delay={index * 120}>
            <article className="timeline-item">
              <div className="timeline-marker">
                <span>{milestone.number}</span>
              </div>

              <div className="timeline-content">
                <span className="timeline-stage">
                  ETAPA {milestone.number}
                </span>

                <h4>{milestone.title}</h4>

                <p>{milestone.description}</p>

                <p className="timeline-detail">
                  {milestone.detail}
                </p>

                <div className="timeline-tags">
                  {milestone.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   TECNOLOGÍAS
===================================================== */

function ProjectTechnologies() {
  return (
    <div id="project-stack" className="project-subsection">
      <div className="project-subheading">
        <span>STACK TECNOLÓGICO</span>
        <h3>Herramientas utilizadas.</h3>
        <p>
          Tecnologías que forman parte de la infraestructura
          y de la evolución de este proyecto.
        </p>
      </div>

      <Reveal>
        <div className="project-tech-list">
          {technologies.map((technology, index) => (
            <span key={technology} style={{ "--tech-index": index }}>
              {technology}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* =====================================================
   APRENDIZAJES
===================================================== */

function ProjectLearning() {
  return (
    <Reveal>
      <div id="project-learning" className="project-learning">
        <div className="learning-icon">
          <Terminal size={25} />
        </div>

        <div className="learning-content">
          <span>LO QUE ME HA APORTADO</span>
          <h3>Aprender haciendo.</h3>

          <p>
            Este proyecto me ha permitido experimentar con
            virtualización, Linux, Docker, redes, almacenamiento,
            publicación segura de servicios y administración
            de sistemas. También me ha enseñado a escuchar a
            los usuarios y a convertir sus peticiones en mejoras
            reales.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <ProjectHeader />

        <ProjectCard />

        <ProjectArchitecture />

        <ProjectSecurity />

        <ProjectUserExperience />

        <ProjectEvolution />

        <ProjectTechnologies />

        <ProjectLearning />

        <div className="projects-footer">
          <span>SANTIFULL / PROYECTO PERSONAL</span>
          <span>04 — 05</span>
        </div>
      </div>
    </section>
  );
}