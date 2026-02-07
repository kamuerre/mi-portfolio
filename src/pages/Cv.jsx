import { useMemo, useState } from "react";
import proyectos from "../data/proyectos.js";
import { Link } from "react-router-dom";

export default function Cv() {
    const PROFILE = {
        nombre: "Camila Rasnosky",
        rol: "Desarrolladora Full Stack · Frontend / UX UI",
        ubicacion: "Parque Chacabuco, Ciudad Autónoma de Buenos Aires, ARGENTINA",
        email: "crasnosky@gmail.com",
        linkedin: "https://www.linkedin.com/in/camila-rasnosky/",
        github: "https://github.com/kamuerre",
        pdfUrl: "/cv/cv-camila.pdf",
    };

    const EXPERIENCIA = [
        {
            title: "Co-fundadora · Desarrolladora Full Stack · UX/UI",
            subtitle: "Tiza y Código",
            meta: "Ago 2025 – Actualidad",
            desc:
                "Emprendimiento de desarrollo de software cofundado junto a Andrés Pablo Silvestri. Diseño, análisis funcional y desarrollo de soluciones web a medida, combinando frontend, backend y experiencia de usuario.",
            bullets: [
                "Diseño UX/UI, análisis funcional y desarrollo full stack de aplicaciones web.",
                "Creación de herramientas personalizadas para gestión de contenidos y automatización.",
                "Desarrollo de la herramienta de actualización de Home para Arithmetic of Compassion (JSON → HTML).",
                "Mantenimiento y mejoras del sitio Arithmetic of Compassion.",
                "Trabajo con clientes freelance: relevamiento, diseño, implementación y entrega.",
            ],
        },
        {
            title: "Desarrolladora Full Stack - Diseñadora UX/UI  (Frontend · UX/UI)",
            subtitle: "América Virtual SA (ANSES — Staff)",
            meta: "Oct 2025 – Actualidad",
            desc:
                "Trabajo con foco en frontend y UX/UI. Rediseño y evolución de sistemas internos y sitios institucionales, alineados al nuevo manual de estilos.",
            bullets: [
                "Diseño de maquetas y prototipos de nuevas funcionalidades para sistemas internos.",
                "Rediseño de interfaces según el manual de estilos institucional.",
                "Trabajo colaborativo con equipos técnicos y funcionales.",
                "Enfoque en usabilidad, accesibilidad y consistencia visual.",
            ],
        },
        {
            title: "Desarrolladora Full Stack Jr.",
            subtitle: "Agencia Nacional de Seguridad Vial",
            meta: "Jun 2023 – Ago 2025",
            desc:
                "Desarrollo, implementación y soporte de aplicaciones web. Participación en análisis, diseño, programación, pruebas y despliegue.",
            bullets: [
                "Front-end con React y buenas prácticas de accesibilidad.",
                "Back-end y APIs (según proyecto) + documentación técnica.",
                "Soporte evolutivo/correctivo y colaboración con equipos.",
            ],
        },
        {
            title: "Desarrolladora Frontend Jr. (Freelance)",
            subtitle: "TSF",
            meta: "Ene 2025 – May 2025",
            desc:
                "Desarrollo front-end de formularios web para el proyecto “QR Bus”, orientado a validación y seguimiento en tiempo real.",
            bullets: ["UI y validaciones", "Maquetación responsive", "Iteración rápida con stakeholders"],
        },
        {
            title: "Administrativa",
            subtitle: "Agencia Nacional de Seguridad Vial",
            meta: "Ene 2017 – Jun 2023",
            desc:
                "Gestión administrativa, auditorías, control de stock, facturación, capacitaciones y campañas de concientización vial.",
            bullets: ["Procesos y organización", "Gestión de documentación", "Coordinación y seguimiento"],
        },
    ];

    const SKILLS = [
        { label: "React", group: "Frontend" },
        { label: "JavaScript", group: "Frontend" },
        { label: "HTML", group: "Frontend" },
        { label: "CSS", group: "Frontend" },
        { label: "Accesibilidad Web", group: "Frontend" },
        { label: "Node.js", group: "Backend" },
        { label: "Express", group: "Backend" },
        { label: "Java", group: "Backend" },
        { label: "SQL Server", group: "Bases de datos" },
        { label: "MySQL", group: "Bases de datos" },
        { label: "MongoDB", group: "Bases de datos" },
        { label: "GitHub", group: "Herramientas" },
        { label: "GitLab", group: "Herramientas" },
        { label: "Postman", group: "Herramientas" },
        { label: "Swagger", group: "Herramientas" },
        { label: "Figma", group: "Herramientas" },
        { label: "Trello", group: "Herramientas" },
    ];

    const EDUCACION = [
        { title: "Lic. en Ciencias de la Computación", place: "UBA", meta: "2024 – Actualidad" },
        { title: "Profesorado de Educación Primaria", place: "ENS N°2 Mariano Acosta", meta: "2020 – Actualidad" },
    ];

    const CURSOS = [
        "Node.js – Talento Tech",
        "React – Talento Tech",
        "Desarrollo Web – Coderhouse",
        "Programación Full Stack – Egg",
        "UX/UI – Codo a Codo",
        
    ];
   

    const tabs = [
        { key: "resumen", label: "Resumen" },
        { key: "experiencia", label: "Experiencia" },
        { key: "educacion", label: "Educación" },
        { key: "skills", label: "Skills" },
        
    ];

    const [tab, setTab] = useState("resumen");
    const [toastMsg, setToastMsg] = useState("");
    const [skillQuery, setSkillQuery] = useState("");
    const [skillGroup, setSkillGroup] = useState("");

    function toast(msg) {
        setToastMsg(msg);
        window.clearTimeout(window.__cv_toast);
        window.__cv_toast = window.setTimeout(() => setToastMsg(""), 1400);
    }

    function openExternal(url) {
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
    }

    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
            toast("Copiado ✅");
        } catch {
            toast("No se pudo copiar");
        }
    }

    const skillGroups = useMemo(
        () => Array.from(new Set(SKILLS.map((s) => s.group))).sort((a, b) => a.localeCompare(b)),
        [SKILLS]
    );

    const filteredSkills = useMemo(() => {
        const q = skillQuery.trim().toLowerCase();
        return SKILLS.filter((s) => {
            const qOk = !q || s.label.toLowerCase().includes(q);
            const gOk = !skillGroup || s.group === skillGroup;
            return qOk && gOk;
        });
    }, [SKILLS, skillQuery, skillGroup]);

    return (
        <div className="container stack-lg">
            {/* HERO */}
            <section className="card card--hero stack">
                <div className="cv-hero">
                    <div>
                        <h1 style={{ marginBottom: 6 }}>{PROFILE.nombre}</h1>
                        <div className="muted" style={{ fontWeight: 800 }}>{PROFILE.rol}</div>
                    </div>

                    <div className="btn-row">
                        <a href={PROFILE.pdfUrl} target="_blank" rel="noreferrer" className="btn">
                            Ver CV (PDF)
                        </a>
                        <a href={PROFILE.pdfUrl} download className="btn secondary">
                            Descargar PDF
                        </a>
                    </div>
                </div>

                <p className="muted" style={{ marginTop: 0 }}>
                    Desarrolladora web con experiencia en construcción, soporte y mejora de aplicaciones.
                    Enfoque en accesibilidad, diseño centrado en el usuario y automatización de procesos.
                </p>

                <div className="cv-meta">
                    <span className="muted">{PROFILE.ubicacion}</span>
                    <span className="dot"> • </span>

                    <a href={`mailto:${PROFILE.email}`} className="cv-link">
                        {PROFILE.email}
                    </a>

                    <span className="dot">  •  </span>

                    <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="cv-link">
                        LinkedIn
                    </a>

                    <span className="dot"> • </span>

                    <a href={PROFILE.github} target="_blank" rel="noreferrer" className="cv-link">
                        GitHub
                    </a>
                </div>


                <div className="tabs filters">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            className={`filter ${tab === t.key ? "active" : ""}`}
                            onClick={() => setTab(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

            </section>

            {/* CONTENT */}
            {tab === "resumen" && (
                <section className="grid-2">
                    <div className="card stack">
                        <h2>Resumen</h2>
                        <p className="muted">
                            Desarrollo soluciones web con enfoque UX/UI, priorizando claridad, accesibilidad y mantenibilidad. Experiencia trabajando en equipos interdisciplinarios, con iteración constante y foco en la experiencia de usuario.
                        </p>

                        <h3 style={{ marginTop: 6 }}>Highlights</h3>
                        <ul className="bullets">
                            <li>React + Vite para UI modular y rápida.</li>
                            <li>Buenas prácticas: accesibilidad, responsive, componentes reutilizables.</li>
                            <li>Integración con APIs + documentación (Postman/Swagger).</li>
                        </ul>
                    </div>

                    <div className="card stack">
                        <h2>Acciones rápidas</h2>
                        <div className="btn-row">
                            <button className="btn" onClick={() => setTab("proyectos")}>Ver proyectos</button>
                            <button className="btn secondary" onClick={() => setTab("skills")}>Ver skills</button>
                            <Link className="btn ghost" to="/certificados">Ir a certificados</Link>
                        </div>

                        
                    </div>
                </section>
            )}

            {tab === "experiencia" && (
                <section className="card stack">
                    <h2>Experiencia</h2>

                    <div className="stack-lg">
                        {EXPERIENCIA.map((x) => (
                            <div key={`${x.title}-${x.meta}`} className="cv-item">
                                <div className="cv-item-top">
                                    <div style={{ fontWeight: 900 }}>{x.title}</div>
                                    <div className="muted">{x.meta}</div>
                                </div>
                                <div className="muted">{x.subtitle}</div>
                                <p className="muted" style={{ margin: "6px 0 0" }}>{x.desc}</p>
                                {!!x.bullets?.length && (
                                    <ul className="bullets">
                                        {x.bullets.map((b) => <li key={b}>{b}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {tab === "proyectos" && (
                <section className="card stack">
                    <h2>Proyectos</h2>

                    <div className="grid-2">
                        {proyectos.map((p) => (
                            <article key={p.id} className="card card--inner stack">
                                <div className="stack-sm">
                                    <h3 style={{ marginBottom: 4 }}>{p.nombre}</h3>
                                    <p className="muted">{p.descripcion}</p>
                                </div>

                                {!!p.stack?.length && (
                                    <div className="chips">
                                        {p.stack.map((tech) => (
                                            <span key={tech} className="chip soft">{tech}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="btn-row">
                                    {p.link ? (
                                        <a className="btn" href={p.link} target="_blank" rel="noreferrer">Ver demo</a>
                                    ) : (
                                        <span className="muted" style={{ fontSize: 13 }}>Sin demo</span>
                                    )}

                                    {p.repo ? (
                                        <a className="btn secondary" href={p.repo} target="_blank" rel="noreferrer">Repo</a>
                                    ) : null}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {tab === "skills" && (
                <section className="card stack">
                    <h2>Skills</h2>

                    <div className="filters">
                        <input
                            className="input"
                            value={skillQuery}
                            onChange={(e) => setSkillQuery(e.target.value)}
                            placeholder="Buscar skill…"
                        />

                        <select className="input" value={skillGroup} onChange={(e) => setSkillGroup(e.target.value)}>
                            <option value="">Todas las categorías</option>
                            {skillGroups.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>

                        <button className="btn ghost" onClick={() => { setSkillQuery(""); setSkillGroup(""); }}>
                            Limpiar
                        </button>
                    </div>

                    <div className="stack">
                        {skillGroups.map((g) => {
                            const items = filteredSkills.filter((s) => s.group === g);
                            if (!items.length) return null;

                            return (
                                <div key={g} className="stack-sm">
                                    <div style={{ fontWeight: 900 }}>{g}</div>
                                    <div className="chips">
                                        {items.map((s) => (
                                            <span key={s.label} className="chip soft">{s.label}</span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {!filteredSkills.length && <div className="muted">No hay resultados.</div>}
                    </div>
                </section>
            )}

            {tab === "educacion" && (
                <section className="grid-2">
                    <div className="card stack">
                        <h2>Educación</h2>
                        <ul className="bullets">
                            {EDUCACION.map((e) => (
                                <li key={e.title}>
                                    <strong>{e.title}</strong> — {e.place} <span className="muted">({e.meta})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card stack">
                        <h2>Cursos (resumen)</h2>
                         
                        <ul className="bullets">
                            {CURSOS.map((c) => <li key={c}>{c}</li>)}
                        </ul>
                        <Link className="btn ghost" to="/certificados">Ir a certificados</Link>

                    </div>
                </section>
            )}

            {toastMsg ? <div className="toast">{toastMsg}</div> : null}
        </div>
    );
}
