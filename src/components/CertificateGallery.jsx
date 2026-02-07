import { useMemo, useState } from "react";
import dataRaw from "../data/certificados.json";
import PdfThumb from "./PdfThumb";

function parseDateLoose(s) {
  if (!s) return null;
  const str = String(s).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  if (/^\d{4}-\d{2}$/.test(str)) {
    const [y, m] = str.split("-").map(Number);
    return new Date(y, m - 1, 1);
  }
  if (/^\d{4}$/.test(str)) {
    return new Date(Number(str), 0, 1);
  }
  return null;
}

function fmtFecha(s) {
  if (!s) return "";
  const str = String(s).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split("-");
    return `${d}/${m}/${y}`;
  }
  if (/^\d{4}-\d{2}$/.test(str)) {
    const [y, m] = str.split("-");
    return `${m}/${y}`;
  }
  return str;
}

function fechaVisible(item) {
  if (item.fecha_inicio && item.fecha_fin) {
    return `${fmtFecha(item.fecha_inicio)} → ${fmtFecha(item.fecha_fin)}`;
  }
  if (item.fecha) return fmtFecha(item.fecha);
  if (item.fecha_inicio) return fmtFecha(item.fecha_inicio);
  return "";
}

function sortKey(item) {
  // ordenamos por: fecha_fin > fecha > fecha_inicio
  const candidate = item.fecha_fin || item.fecha || item.fecha_inicio;
  const dt = parseDateLoose(candidate);
  return dt ? dt.getTime() : -Infinity;
}

function uniq(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
}

export default function CertificateGallery() {
  const [q, setQ] = useState("");
  const [inst, setInst] = useState("");

  // evita “desaparecen items” por ids duplicados
  const data = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const it of dataRaw) {
      if (!it?.id) continue;
      let id = it.id;
      if (seen.has(id)) {
        let n = 2;
        while (seen.has(`${id}-${n}`)) n++;
        id = `${id}-${n}`;
      }
      seen.add(id);
      out.push({ ...it, id });
    }
    return out;
  }, []);

  const instituciones = useMemo(
    () => uniq(data.map((d) => d.institucion).filter(Boolean)),
    [data]
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return data
      .filter((item) => {
        const haystack = [
          item.curso,
          item.institucion,
          (item.tags || []).join(" "),
        ]
          .join(" ")
          .toLowerCase();

        const qOk = !query || haystack.includes(query);
        const instOk = !inst || item.institucion === inst;
        return qOk && instOk;
      })
      .sort((a, b) => sortKey(b) - sortKey(a)); // NUEVO → VIEJO
  }, [data, q, inst]);

  return (
    <div className="cert-page">
      <header className="cert-header">
        <div>
          <h1 style={{ margin: 0 }}>Certificados</h1>
          <div className="cert-count">
            {filtered.length} de {data.length}
          </div>
        </div>
      </header>

      <section className="cert-controls">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por curso, institución o tag…"
          className="cert-input"
        />

        <select
          value={inst}
          onChange={(e) => setInst(e.target.value)}
          className="cert-input"
        >
          <option value="">Todas las instituciones</option>
          {instituciones.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </section>

      <section className="cert-grid">
        {filtered.map((item) => (
          <article key={item.id} className="cert-card">
            <div className="cert-thumb">
              {item.tipo === "pdf" ? (
                <PdfThumb url={item.archivo} title={item.curso} />
              ) : (
                <img
                  src={item.archivo}
                  alt={`Miniatura - ${item.curso}`}
                  loading="lazy"
                  className="cert-img"
                />
              )}
            </div>

            <div className="cert-body">
              <div className="cert-title">{item.curso}</div>
              <div className="cert-meta">{item.institucion}</div>
              {fechaVisible(item) ? (
                <div className="cert-meta">{fechaVisible(item)}</div>
              ) : null}

              <div className="cert-actions">
                <a
                  href={item.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-btn cert-btn--primary"
                >
                  Ver
                </a>
                <a href={item.archivo} download className="cert-btn">
                  Descargar
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
