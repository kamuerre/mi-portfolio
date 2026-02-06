export default function SobreMi() {
  return (
    <div className="container stack-lg">
      <h1>Sobre mí</h1>

      <section className="card stack">
        <h2>Perfil</h2>
        <p className="muted">
          Soy desarrolladora web con foco en frontend y diseño UX/UI. Me interesa construir interfaces
          claras, accesibles y fáciles de usar, cuidando tanto la experiencia del usuario como la
          calidad del código.
        </p>
        <p className="muted">
          Trabajo en el diseño y desarrollo de productos digitales, desde el análisis funcional y los
          wireframes hasta la implementación en React. Tengo experiencia en entornos institucionales
          y proyectos reales, donde es clave pensar en escalabilidad, mantenibilidad y consistencia
          visual.
        </p>
        <p className="muted">
          Disfruto colaborar con equipos interdisciplinarios y transformar necesidades complejas en
          soluciones simples y ordenadas. Me interesa seguir creciendo en proyectos donde el diseño y
          la tecnología estén alineados para generar impacto real.
        </p>
      </section>

      <section className="grid-2">
        <div className="card stack">
          <h2>Skills</h2>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>React + Vite</li>
            <li>Diseño UX/UI: research, wireframes, prototipos</li>
            <li>Accesibilidad web</li>
          </ul>
        </div>

        <div className="card stack">
          <h2>Herramientas</h2>
          <ul>
            <li>Figma</li>
            <li>Git / GitHub</li>
            <li>VS Code</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
