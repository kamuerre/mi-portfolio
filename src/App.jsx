import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SobreMi from "./pages/SobreMi";
import Proyectos from "./pages/Proyectos";
import Certificados from "./pages/Certificados";
import Cv from "./pages/Cv";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/certificados" element={<Certificados />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
