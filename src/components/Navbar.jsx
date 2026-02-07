import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Cierra el menú al cambiar el tamaño a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <div className="navbar__brand">Camila Rasnosky</div>

        {/* Botón hamburguesa (solo se ve en mobile por CSS) */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        {/* Links */}
        <nav
          id="nav-links"
          className={`navbar__links ${open ? "is-open" : ""}`}
        >
          <NavLink to="/" className="navlink" onClick={closeMenu}>
            Inicio
          </NavLink>
          <NavLink to="/sobre-mi" className="navlink" onClick={closeMenu}>
            Sobre mí
          </NavLink>
          <NavLink to="/cv" className="navlink" onClick={closeMenu}>
            CV
          </NavLink>
          <NavLink to="/proyectos" className="navlink" onClick={closeMenu}>
            Proyectos
          </NavLink>
          <NavLink to="/certificados" className="navlink" onClick={closeMenu}>
            Certificados
          </NavLink>          
          <NavLink to="/contacto" className="navlink" onClick={closeMenu}>
            Contacto
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
