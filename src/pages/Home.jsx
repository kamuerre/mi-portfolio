import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container stack-lg">
      {/* HERO */}
      <section className="card hero stack">
        <div className="stack-sm">
          <h1 className="hero__title">Portfolio</h1>
          <p className="muted hero__subtitle">
            Desarrollo web + UX/UI. Navegá por las secciones para ver proyectos, certificados y CV.
          </p>
        </div>

        <div className="btn-row">
          <Link to="/proyectos" className="btn btn--primary">
            Ver proyectos
          </Link>
          <Link to="/certificados" className="btn secondary">
            Certificados
          </Link>
          <Link to="/cv" className="btn ghost">
            CV
          </Link>
          <Link to="/contacto" className="btn">
            Contacto
          </Link>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="section">
        <div className="home-grid">
          <Link to="/sobre-mi" className="card card-link stack-sm">
            <div className="card-link__top">
              <span className="chip soft">Perfil</span>
            </div>
            <h2 className="card-title">Sobre mí</h2>
            <p className="muted">
              Experiencia, enfoque de diseño y herramientas que uso para trabajar.
            </p>
          </Link>

          <Link to="/proyectos" className="card card-link stack-sm">
            <div className="card-link__top">
              <span className="chip soft">Demos</span>
            </div>
            <h2 className="card-title">Proyectos</h2>
            <p className="muted">
              Selección de trabajos y prototipos con links y stack.
            </p>
          </Link>

          <Link to="/certificados" className="card card-link stack-sm">
            <div className="card-link__top">
              <span className="chip soft">Formación</span>
            </div>
            <h2 className="card-title">Certificados</h2>
            <p className="muted">
              Galería con PDFs + miniaturas y fechas, ordenados cronológicamente.
            </p>
          </Link>

          <Link to="/cv" className="card card-link stack-sm">
            <div className="card-link__top">
              <span className="chip soft">Resumen</span>
            </div>
            <h2 className="card-title">CV</h2>
            <p className="muted">
              CV interactivo con experiencia, skills y acceso a PDF.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
