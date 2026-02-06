import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          Inicio
        </Link>

        <nav className="navbar__links">
          <NavItem to="/sobre-mi">Sobre mí</NavItem>
          <NavItem to="/proyectos">Proyectos</NavItem>
          <NavItem to="/certificados">Certificados</NavItem>
          <NavItem to="/cv">CV</NavItem>
          <NavItem to="/contacto">Contacto</NavItem>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `navlink ${isActive ? "navlink--active" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}
