import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container stack-lg">
      {/* HERO */}
      <section className="card hero stack">
        <div className="stack-sm">
          <h1 className="hero__title">Camila Rasnosky</h1>
          <p className="muted hero__subtitle">
            Desarrollo web + UX/UI. Diseño interfaces y construyo herramientas
            funcionales combinando lógica, estética y empatía.
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

      {/* PRESENTACIÓN PERSONAL */}
      <section className="section">
        <div className="card stack">
          <div className="stack-sm">
            <h2 className="card-title"> ¿Quién soy? </h2>
          </div>

          <div className="stack-sm">
            <p>
              Mi camino hacia la tecnología no fue lineal, y ahí está mi mayor
              fortaleza: antes de meterme de lleno en el desarrollo de software
              y la computación, pasé por la docencia primaria, el teatro y las
              artes audiovisuales.
            </p>
            <p>
              Me gusta mucho investigar, detectar problemas cotidianos y pensar
              soluciones realizables y escalables. Combinando mis conocimientos
              técnicos con herramientas de IA, desarrollé automatizaciones para
              simplificar tareas repetitivas tanto en mi trabajo como en el de
              otras personas, e incluso armé plataformas comunitarias, como un
              directorio web para mi grupo de vecinos donde centralizamos
              teléfonos útiles y recomendaciones de personas que brinden servicios o hagan reparaciones y sean de confianza.
            </p>
            <p className="muted">
              Cuando apago la compu, me vas a encontrar escribiendo cuentos y
              poesía, editando algún video musical, yendo a recitales o
              compartiendo tardes de juegos de mesa en familia o con amigos.
            </p>
          </div>

         
          <div className="btn-row">
            <Link to="/sobre-mi" className="btn secondary">
              Más sobre mi recorrido
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
