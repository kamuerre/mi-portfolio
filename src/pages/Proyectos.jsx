import proyectos from "../data/proyectos";

export default function Proyectos() {
  return (
    <div className="container stack-lg">
      <header className="stack-sm">
        <h1>Proyectos</h1>
        <p className="muted">
          Selección de trabajos y prototipos (frontend + UX/UI). Incluye demos públicas.
        </p>
      </header>

      <section className="grid-3">
        {proyectos.map((p) => (
          <article key={p.id} className="card stack">
            <div className="stack-sm">
              <h2 className="card-title">{p.nombre}</h2>

              <p className="muted">{p.descripcion}</p>
            </div>

            {!!p.stack?.length && (
              <div className="chips">
                {p.stack.map((tech) => (
                  <span key={tech} className="chip soft">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="btn-row">
              {p.link ? (
                <a href={p.link} target="_blank" rel="noreferrer" className="btn">
                  Ver demo
                </a>
              ) : (
                <span className="muted" style={{ fontSize: 13 }}>
                  Sin demo
                </span>
              )}

              {p.repo ? (
                <a href={p.repo} target="_blank" rel="noreferrer" className="btn secondary">
                  Repo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
