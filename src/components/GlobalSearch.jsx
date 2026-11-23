import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  Command,
  Layers3,
  Cpu,
  FolderKanban,
  UserRound,
} from "lucide-react";
import {
  technologies,
  categoryNames,
} from "./TechnologyStack";
import "./GlobalSearch.css";

const normalize = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const sectionResults = [
  {
    id: "home",
    title: "Inicio",
    subtitle: "Presentación y portada",
    group: "Secciones",
    href: "#home",
    keywords: "inicio portada hero santifull piensa construye conecta",
    icon: "home",
  },
  {
    id: "about",
    title: "Sobre mí",
    subtitle: "Perfil, experiencia y áreas de interés",
    group: "Secciones",
    href: "#about",
    keywords: "perfil informático soporte técnico experiencia sistemas infraestructura",
    icon: "user",
  },
  {
    id: "technologies",
    title: "Tecnologías",
    subtitle: "Catálogo completo de herramientas",
    group: "Secciones",
    href: "#technologies",
    keywords: "stack herramientas software plataformas",
    icon: "cpu",
  },
  {
    id: "projects",
    title: "Proyectos",
    subtitle: "Proyectos personales y experimentación",
    group: "Secciones",
    href: "#projects",
    keywords: "proyectos portfolio homelab",
    icon: "folder",
  },
  {
    id: "project-videoteca",
    title: "Videoteca Santi · Emby",
    subtitle: "Servidor multimedia y ecosistema personal",
    group: "Videoteca Santi",
    href: "#project-videoteca",
    keywords: "emby plex multimedia películas series biblioteca streaming servidor",
    icon: "project",
  },
  {
    id: "project-architecture",
    title: "Arquitectura e infraestructura",
    subtitle: "Servidor, almacenamiento, virtualización y red",
    group: "Videoteca Santi",
    href: "#project-architecture",
    keywords: "intel n100 ram windows vmware ubuntu docker almacenamiento discos red fibra wol",
    icon: "project",
  },
  {
    id: "project-security",
    title: "Seguridad y acceso",
    subtitle: "Protección, proxy inverso y acceso remoto",
    group: "Videoteca Santi",
    href: "#project-security",
    keywords: "cloudflare nginx proxy manager crowdsec fail2ban firewall tailscale dns certificados",
    icon: "project",
  },
  {
    id: "project-experience",
    title: "Experiencia de usuario",
    subtitle: "Servicios, soporte y atención a usuarios",
    group: "Videoteca Santi",
    href: "#project-experience",
    keywords: "chatwoot centro ayuda solicitudes contenido soporte usuarios comunicación",
    icon: "project",
  },
  {
    id: "project-evolution",
    title: "Evolución del proyecto",
    subtitle: "De Plex a un ecosistema de servicios",
    group: "Videoteca Santi",
    href: "#project-evolution",
    keywords: "plex emby vmware ubuntu docker evolución etapas historia",
    icon: "project",
  },
  {
    id: "project-stack",
    title: "Stack tecnológico del proyecto",
    subtitle: "Herramientas utilizadas en Videoteca Santi",
    group: "Videoteca Santi",
    href: "#project-stack",
    keywords: "tecnologías herramientas emby plex docker portainer cloudflare chatwoot",
    icon: "project",
  },
  {
    id: "project-learning",
    title: "Aprendizajes",
    subtitle: "Conocimientos puestos en práctica",
    group: "Videoteca Santi",
    href: "#project-learning",
    keywords: "aprendizaje linux virtualización redes almacenamiento publicación segura administración sistemas",
    icon: "project",
  },
  {
    id: "skills-support",
    title: "Soporte informático",
    subtitle: "Incidencias, asistencia y resolución de problemas",
    group: "Áreas y habilidades",
    href: "#about",
    keywords: "helpdesk soporte técnico incidencias usuarios troubleshooting",
    icon: "skill",
  },
  {
    id: "skills-systems",
    title: "Sistemas e infraestructura",
    subtitle: "Administración, despliegue y servicios",
    group: "Áreas y habilidades",
    href: "#about",
    keywords: "sysadmin windows linux servidores infraestructura",
    icon: "skill",
  },
  {
    id: "skills-network",
    title: "Redes y conectividad",
    subtitle: "Red local, conectividad y acceso remoto",
    group: "Áreas y habilidades",
    href: "#project-architecture",
    keywords: "redes network tcp ip conectividad router fibra",
    icon: "skill",
  },
  {
    id: "skills-virtualization",
    title: "Virtualización y contenedores",
    subtitle: "VMware, Docker y servicios autoalojados",
    group: "Áreas y habilidades",
    href: "#project-architecture",
    keywords: "vmware docker containers virtual machines homelab self hosted",
    icon: "skill",
  },
  {
    id: "skills-security",
    title: "Seguridad tecnológica",
    subtitle: "Protección de servicios y control de acceso",
    group: "Áreas y habilidades",
    href: "#project-security",
    keywords: "seguridad ciberseguridad firewall cloudflare crowdsec fail2ban",
    icon: "skill",
  },
  {
    id: "skills-automation",
    title: "Homelab y automatización",
    subtitle: "Experimentación y despliegue de servicios",
    group: "Áreas y habilidades",
    href: "#about",
    keywords: "homelab automatización docker self hosting monitorización",
    icon: "skill",
  },
];

const iconFor = (kind) => {
  if (kind === "cpu") return Cpu;
  if (kind === "folder") return FolderKanban;
  if (kind === "user") return UserRound;
  if (kind === "project") return Layers3;
  return Command;
};

export default function GlobalSearch({ onTechnologySelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const technologyResults = useMemo(
    () =>
      technologies.map((technology) => ({
        id: `technology-${technology.name}`,
        title: technology.name,
        subtitle: technology.description,
        group: "Tecnologías",
        technologyName: technology.name,
        keywords: `${technology.name} ${technology.description} ${
          categoryNames[technology.category] || ""
        } ${technology.category}`,
        icon: "cpu",
      })),
    []
  );

  const allResults = useMemo(
    () => [...sectionResults, ...technologyResults],
    [technologyResults]
  );

  const groupedResults = useMemo(() => {
    const normalizedQuery = normalize(query);
    const filtered = normalizedQuery
      ? allResults.filter((item) =>
          normalize(
            `${item.title} ${item.subtitle} ${item.keywords || ""} ${item.group}`
          ).includes(normalizedQuery)
        )
      : sectionResults.slice(0, 7);

    const groups = new Map();
    filtered.forEach((item) => {
      if (!groups.has(item.group)) groups.set(item.group, []);
      groups.get(item.group).push(item);
    });

    return Array.from(groups, ([name, items]) => ({ name, items }));
  }, [allResults, query]);

  const flatResults = useMemo(
    () => groupedResults.flatMap((group) => group.items),
    [groupedResults]
  );

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const activeElement = resultsRef.current?.querySelector(
      `[data-result-index="${activeIndex}"]`
    );
    activeElement?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const chooseResult = (item) => {
    closeSearch();

    if (item.technologyName) {
      onTechnologySelect?.(item.technologyName);
      requestAnimationFrame(() => {
        document.getElementById("technologies")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
      return;
    }

    if (item.href) {
      window.location.hash = item.href;
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        flatResults.length ? (current + 1) % flatResults.length : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        flatResults.length
          ? (current - 1 + flatResults.length) % flatResults.length
          : 0
      );
    }

    if (event.key === "Enter" && flatResults[activeIndex]) {
      event.preventDefault();
      chooseResult(flatResults[activeIndex]);
    }
  };

  let resultIndex = -1;

  return (
    <>
      <button
        type="button"
        className="global-search-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir búsqueda global"
      >
        <Search size={16} />
        <span>Buscar</span>
        <kbd><span>Ctrl</span><span>K</span></kbd>
      </button>

      {isOpen && (
        <div
          className="global-search-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            className="global-search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Búsqueda global"
          >
            <div className="global-search-input-wrap">
              <Search size={21} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Busca tecnologías, proyectos, habilidades..."
                autoComplete="off"
                aria-label="Buscar en todo el portfolio"
              />
              {query && (
                <button
                  type="button"
                  className="global-search-clear"
                  onClick={() => setQuery("")}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={17} />
                </button>
              )}
              <button
                type="button"
                className="global-search-escape"
                onClick={closeSearch}
              >
                ESC
              </button>
            </div>

            <div className="global-search-results" ref={resultsRef}>
              {flatResults.length ? (
                groupedResults.map((group) => (
                  <div className="global-search-group" key={group.name}>
                    <div className="global-search-group-title">{group.name}</div>
                    {group.items.map((item) => {
                      resultIndex += 1;
                      const index = resultIndex;
                      const Icon = iconFor(item.icon);

                      return (
                        <button
                          type="button"
                          key={item.id}
                          data-result-index={index}
                          className={`global-search-result ${
                            activeIndex === index ? "is-active" : ""
                          }`}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => chooseResult(item)}
                        >
                          <span className="global-search-result-icon">
                            <Icon size={17} />
                          </span>
                          <span className="global-search-result-copy">
                            <strong>{item.title}</strong>
                            <small>{item.subtitle}</small>
                          </span>
                          <ArrowUpRight
                            className="global-search-result-arrow"
                            size={16}
                          />
                        </button>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="global-search-empty">
                  <Search size={25} />
                  <strong>No hay resultados</strong>
                  <span>Prueba con otra palabra o tecnología.</span>
                </div>
              )}
            </div>

            <footer className="global-search-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navegar</span>
              <span><kbd>↵</kbd> Abrir resultado</span>
              <span><kbd>ESC</kbd> Cerrar</span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
