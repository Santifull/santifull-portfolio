
import { useEffect, useMemo, useState } from "react";
import {
  Boxes,
  Activity,
  Headset,
  BookOpen,
  Clapperboard,
  Workflow,
  Compass,
  Layers3,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import "./TechnologyStack.css";

const categories = [
  { id: "all", label: "Todas", icon: Layers3 },
  { id: "infrastructure", label: "Infraestructura", icon: Boxes },
  { id: "monitoring", label: "Monitorización", icon: Activity },
  { id: "it-management", label: "Gestión IT", icon: Headset },
  { id: "documentation", label: "Documentación", icon: BookOpen },
  { id: "multimedia", label: "Multimedia", icon: Clapperboard },
  { id: "business", label: "Automatización y negocio", icon: Workflow },
  { id: "specialized", label: "Servicios especializados", icon: Compass },
];

export const technologies = [
  // INFRAESTRUCTURA Y DESPLIEGUE
  {
    name: "Docker",
    category: "infrastructure",
    logo: "docker",
    color: "2496ED",
    description: "Plataforma de contenedores para desplegar, ejecutar y aislar aplicaciones y servicios de forma consistente.",
  },
  {
    name: "Docker Compose",
    category: "infrastructure",
    logo: "docker",
    color: "2496ED",
    description: "Herramienta para definir y gestionar aplicaciones multicontenedor mediante archivos YAML.",
  },
  {
    name: "Portainer",
    category: "infrastructure",
    logo: "portainer",
    color: "13BEF9",
    description: "Interfaz web para administrar entornos Docker, contenedores, imágenes, redes, volúmenes y stacks.",
  },
  {
    name: "Nginx Proxy Manager",
    category: "infrastructure",
    logo: "nginxproxymanager",
    color: "F15833",
    description: "Gestión visual de proxy inverso, dominios, certificados SSL y publicación de servicios.",
  },
  {
    name: "Cloudflare",
    category: "infrastructure",
    logo: "cloudflare",
    color: "F38020",
    description: "Servicios de DNS, proxy, protección y gestión de tráfico para aplicaciones y dominios.",
  },
  {
    name: "CrowdSec",
    category: "infrastructure",
    logo: "crowdsec",
    logoUrl: "https://www.google.com/s2/favicons?domain=crowdsec.net&sz=128",
    color: "37B4AA",
    description: "Sistema colaborativo de detección de comportamientos maliciosos y protección frente a amenazas.",
  },
  {
    name: "MariaDB",
    category: "infrastructure",
    logo: "mariadb",
    color: "003545",
    description: "Sistema de gestión de bases de datos relacional utilizado por diferentes aplicaciones y servicios.",
  },
  {
    name: "PostgreSQL",
    category: "infrastructure",
    logo: "postgresql",
    color: "4169E1",
    description: "Base de datos relacional avanzada, extensible y orientada a la integridad de los datos.",
  },
  {
    name: "Linux",
    category: "infrastructure",
    logo: "linux",
    color: "FCC624",
    description: "Sistema operativo y entorno habitual para administración de servidores y servicios.",
  },
  {
    name: "Windows",
    category: "infrastructure",
    logo: "windows",
    color: "0078D4",
    description: "Sistema operativo de Microsoft, presente en entornos de usuario, administración y servicios IT.",
  },

  // MONITORIZACIÓN
  {
    name: "Uptime Kuma",
    category: "monitoring",
    logo: "uptimekuma",
    color: "5CDD8B",
    description: "Monitorización de disponibilidad de servicios, páginas web, aplicaciones y conexiones.",
  },
  {
    name: "Zabbix",
    category: "monitoring",
    logo: "zabbix",
    color: "D40000",
    description: "Plataforma de monitorización de infraestructura, servidores, dispositivos y servicios mediante métricas y alertas.",
  },
  {
    name: "Prometheus",
    category: "monitoring",
    logo: "prometheus",
    color: "E6522C",
    description: "Sistema de monitorización y recopilación de métricas mediante un modelo de datos basado en series temporales.",
  },
  {
    name: "Grafana",
    category: "monitoring",
    logo: "grafana",
    color: "F46800",
    description: "Visualización de métricas y creación de paneles de control para supervisar sistemas y servicios.",
  },

  // GESTIÓN IT Y SOPORTE
  {
    name: "GLPI",
    category: "it-management",
    logo: "glpi",
    color: "E14927",
    description: "Plataforma ITSM para inventario, gestión de activos, incidencias, solicitudes y soporte técnico.",
  },
  {
    name: "Snipe-IT",
    category: "it-management",
    logo: "snipeit",
    color: "4A90E2",
    description: "Sistema de gestión de inventario y ciclo de vida de activos tecnológicos.",
  },
  {
    name: "ITFlow",
    category: "it-management",
    logo: null,
    logoUrl: "https://www.google.com/s2/favicons?domain=itflow.org&sz=128",
    color: "8B5CF6",
    description: "Plataforma orientada a la gestión de servicios IT, clientes, documentación y operaciones técnicas.",
  },
  {
    name: "Zammad",
    category: "it-management",
    logo: "zammad",
    color: "2B90D9",
    description: "Sistema de soporte y gestión de tickets para centralizar comunicaciones y solicitudes de asistencia.",
  },
  {
    name: "osTicket",
    category: "it-management",
    logo: null,
    logoUrl: "https://www.google.com/s2/favicons?domain=osticket.com&sz=128",
    color: "8B5CF6",
    description: "Sistema de tickets de soporte para organizar, asignar y realizar seguimiento de incidencias.",
  },
  {
    name: "Guacamole",
    category: "it-management",
    logo: "apacheguacamole",
    color: "5783A2",
    description: "Pasarela de acceso remoto mediante navegador, compatible con protocolos como RDP, VNC y SSH.",
  },

  // DOCUMENTACIÓN
  {
    name: "Paperless-ngx",
    category: "documentation",
    logo: "paperlessngx",
    color: "17541F",
    description: "Gestión documental digital con clasificación, búsqueda y organización de documentos.",
  },
  {
    name: "Docmost",
    category: "documentation",
    logo: null,
    logoUrl: "https://www.google.com/s2/favicons?domain=docmost.com&sz=128",
    color: "8B5CF6",
    description: "Espacio colaborativo para crear, organizar y compartir documentación y conocimiento.",
  },
  {
    name: "Wiki.js",
    category: "documentation",
    logo: "wikidotjs",
    color: "1976D2",
    description: "Plataforma wiki para construir bases de conocimiento y documentación técnica.",
  },

  // MULTIMEDIA
  {
    name: "Emby",
    category: "multimedia",
    logo: "emby",
    color: "52B54B",
    description: "Servidor multimedia para organizar, gestionar y reproducir bibliotecas de vídeo y otros contenidos.",
  },
  {
    name: "ErsatzTV",
    category: "multimedia",
    logo: null,
    logoUrl: "https://www.google.com/s2/favicons?domain=ersatztv.org&sz=128",
    color: "8B5CF6",
    description: "Creación de canales de televisión personalizados a partir de bibliotecas multimedia.",
  },
  {
    name: "Audiobookshelf",
    category: "multimedia",
    logo: "audiobookshelf",
    color: "8B5CF6",
    description: "Servidor personal para organizar y reproducir audiolibros y podcasts.",
  },
  {
    name: "Immich",
    category: "multimedia",
    logo: "immich",
    color: "4250AF",
    description: "Plataforma de gestión y copia de seguridad de fotografías y vídeos autoalojada.",
  },

  // AUTOMATIZACIÓN, COLABORACIÓN Y NEGOCIO
  {
    name: "n8n",
    category: "business",
    logo: "n8n",
    color: "EA4B71",
    description: "Plataforma de automatización de flujos de trabajo e integración entre aplicaciones y servicios.",
  },
  {
    name: "Resend",
    category: "business",
    logo: "resend",
    color: "8B5CF6",
    description: "Servicio de envío de correo transaccional e integración de emails mediante API.",
  },
  {
    name: "Mattermost",
    category: "business",
    logo: "mattermost",
    color: "0058CC",
    description: "Plataforma de comunicación y colaboración mediante mensajería para equipos.",
  },
  {
    name: "Dolibarr",
    category: "business",
    logo: "dolibarr",
    color: "8B5CF6",
    description: "ERP y CRM para gestionar procesos empresariales, clientes, facturación y operaciones.",
  },
  {
    name: "Odoo 17",
    category: "business",
    logo: "odoo",
    color: "714B67",
    description: "Suite empresarial modular para gestionar ventas, inventario, facturación, CRM y otros procesos.",
  },
  {
    name: "OpenSourcePOS",
    category: "business",
    logo: null,
    logoUrl: "https://www.google.com/s2/favicons?domain=opensourcepos.org&sz=128",
    color: "8B5CF6",
    description: "Sistema de punto de venta de código abierto para la gestión de operaciones comerciales.",
  },

  // SERVICIOS ESPECIALIZADOS
  {
    name: "Traccar",
    category: "specialized",
    logo: "traccar",
    color: "3B82F6",
    description: "Plataforma de seguimiento GPS y gestión de dispositivos de localización.",
  },
  {
    name: "SearXNG",
    category: "specialized",
    logo: "searxng",
    color: "6B9B37",
    description: "Metabuscador autoalojado que permite consultar múltiples motores de búsqueda desde una interfaz propia.",
  },
];

export const categoryNames = Object.fromEntries(
  categories.map((category) => [category.id, category.label])
);

const normalizeText = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function BrandLogo({ technology }) {
  const [failed, setFailed] = useState(false);

  const logoSrc = technology.logoUrl
    ? technology.logoUrl
    : technology.logo
      ? `https://cdn.simpleicons.org/${technology.logo}/${technology.color}`
      : null;

  if (!logoSrc || failed) {
    return (
      <span className="tech-logo-fallback" aria-hidden="true">
        {technology.name
          .replace(/[^a-zA-Z0-9]/g, "")
          .slice(0, 2)
          .toUpperCase()}
      </span>
    );
  }

  return (
    <img
      className="tech-logo"
      src={logoSrc}
      alt={`${technology.name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function TechnologyCard({ technology, selected, onSelect }) {
  const isSelected = selected === technology.name;

  return (
    <button
      type="button"
      className={`tech-card ${isSelected ? "is-selected" : ""}`}
      onClick={onSelect}
      aria-expanded={isSelected}
      aria-label={`${technology.name}: ${
        isSelected ? "ocultar descripción" : "ver descripción"
      }`}
    >
      <span className="tech-card-top">
        <span className="tech-card-logo">
          <BrandLogo technology={technology} />
        </span>

        <ChevronDown
          className={`tech-card-chevron ${isSelected ? "rotated" : ""}`}
          size={17}
        />
      </span>

      <span className="tech-card-name">{technology.name}</span>

      <span className="tech-card-category">
        {categoryNames[technology.category]}
      </span>

      {isSelected && (
        <span className="tech-card-description">
          {technology.description}
        </span>
      )}
    </button>
  );
}

export default function TechnologyStack({ externalSearchQuery = "" }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Permite que Spotlight active el buscador interno desde cualquier sección.
  useEffect(() => {
    if (externalSearchQuery === "") return;

    setActiveCategory("all");
    setSearchQuery(externalSearchQuery);
    setSelectedTechnology(null);
    setShowAll(true);
  }, [externalSearchQuery]);

  const visibleTechnologies = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);

    return technologies.filter((technology) => {
      const matchesCategory =
        activeCategory === "all" ||
        technology.category === activeCategory;

      const searchableText = normalizeText(
        `${technology.name} ${technology.description} ${
          categoryNames[technology.category]
        }`
      );

      const matchesSearch =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedTechnologies = showAll
    ? visibleTechnologies
    : visibleTechnologies.slice(0, 8);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedTechnology(null);
    setShowAll(false);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setSelectedTechnology(null);
    setShowAll(false);
  };

  const handleTechnologySelect = (name) => {
    setSelectedTechnology((current) =>
      current === name ? null : name
    );
  };

  const hasMoreResults = visibleTechnologies.length > 8;

  return (
    <section className="technology-section" id="technologies">
      <div className="technology-container">
        <div className="technology-heading">
          <span className="technology-eyebrow">
            <span className="technology-eyebrow-dot" />
            SANTIFULL / ECOSISTEMA
          </span>

          <h2>
            TECNOLOGÍAS QUE <span>CONECTAN.</span>
          </h2>

          <p className="technology-intro">
            Herramientas, plataformas y tecnologías que forman parte de mi
            ecosistema IT, mis proyectos y mi entorno de servicios autoalojados.
          </p>

          <div className="technology-stats">
            <span>
              <strong>{technologies.length}</strong> tecnologías
            </span>

            <span className="technology-stats-divider" />

            <span>
              <strong>{categories.length - 1}</strong> categorías
            </span>
          </div>
        </div>

        {/* BUSCADOR DE TECNOLOGÍAS */}
        <div className="technology-search">
          <Search className="technology-search-icon" size={19} />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Buscar tecnologías, herramientas o funciones..."
            aria-label="Buscar tecnologías"
            autoComplete="off"
          />

          {searchQuery && (
            <button
              type="button"
              className="technology-search-clear"
              onClick={() => handleSearchChange("")}
              aria-label="Limpiar búsqueda"
              title="Limpiar búsqueda"
            >
              <X size={17} />
            </button>
          )}

          <span className="technology-search-shortcut">BUSCAR</span>
        </div>

        <div
          className="technology-filters"
          aria-label="Filtrar tecnologías"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                type="button"
                key={category.id}
                className={`technology-filter ${isActive ? "active" : ""}`}
                onClick={() => handleCategoryChange(category.id)}
                aria-pressed={isActive}
              >
                <Icon size={15} />
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="technology-results">
          <div className="technology-results-heading">
            <span>
              {searchQuery
                ? `Resultados para «${searchQuery}»`
                : categoryNames[activeCategory]}
            </span>

            <span>
              {visibleTechnologies.length}{" "}
              {visibleTechnologies.length === 1
                ? "herramienta"
                : "herramientas"}
            </span>
          </div>

          {visibleTechnologies.length > 0 ? (
            <>
              <div className="technology-grid">
                {displayedTechnologies.map((technology) => (
                  <TechnologyCard
                    key={technology.name}
                    technology={technology}
                    selected={selectedTechnology}
                    onSelect={() =>
                      handleTechnologySelect(technology.name)
                    }
                  />
                ))}
              </div>

              {hasMoreResults && (
                <button
                  type="button"
                  className="technology-show-more"
                  onClick={() => setShowAll((current) => !current)}
                  aria-expanded={showAll}
                >
                  {showAll
                    ? "Mostrar menos"
                    : "Explorar todas las tecnologías"}

                  <ChevronDown
                    size={17}
                    className={showAll ? "rotated" : ""}
                  />
                </button>
              )}
            </>
          ) : (
            <div className="technology-empty">
              <span className="technology-empty-icon">
                <Search size={25} />
              </span>

              <h3>No se han encontrado resultados</h3>

              <p>
                No hay tecnologías que coincidan con «{searchQuery}»
                {activeCategory !== "all"
                  ? ` dentro de ${categoryNames[activeCategory]}`
                  : ""}.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setSelectedTechnology(null);
                  setShowAll(false);
                }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        <p className="technology-footer">
          EXPLORANDO · CONSTRUYENDO · CONECTANDO SISTEMAS
        </p>
      </div>
    </section>
  );
}
