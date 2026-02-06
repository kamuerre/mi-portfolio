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
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ margin: 0 }}>Certificados</h1>
          <div style={{ color: "#6b7280", marginTop: 6 }}>
            {filtered.length} de {data.length}
          </div>
        </div>
      </header>

      <section style={controlsStyle}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por curso, institución o tag…"
          style={inputStyle}
        />

        <select value={inst} onChange={(e) => setInst(e.target.value)} style={inputStyle}>
          <option value="">Todas las instituciones</option>
          {instituciones.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </section>

      <section style={gridStyle}>
        {filtered.map((item) => (
          <article key={item.id} style={cardStyle}>
            <div style={thumbWrapStyle}>
              {item.tipo === "pdf" ? (
                <PdfThumb url={item.archivo} title={item.curso} />
              ) : (
                <img
                  src={item.archivo}
                  alt={`Miniatura - ${item.curso}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </div>

            <div style={bodyStyle}>
              <div style={titleStyle}>{item.curso}</div>
              <div style={metaStyle}>{item.institucion}</div>
              {fechaVisible(item) ? <div style={metaStyle}>{fechaVisible(item)}</div> : null}

              <div style={actionsStyle}>
                <a
                  href={item.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...btnStyle, ...btnPrimaryStyle }}
                >
                  Ver
                </a>
                <a href={item.archivo} download style={btnStyle}>
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

/* estilos */
const pageStyle = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: 20,
  fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 12,
  marginBottom: 14,
};

const controlsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 320px",
  gap: 12,
  marginBottom: 14,
};

const inputStyle = {
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  outline: "none",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 14,
};

const cardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  overflow: "hidden",
  background: "white",
  boxShadow: "0 10px 24px rgba(0,0,0,.08)",
};

const thumbWrapStyle = {
  aspectRatio: "16 / 10",
  background: "#f3f4f6",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
};

const bodyStyle = { padding: 12 };

const titleStyle = { fontWeight: 800 };

const metaStyle = {
  color: "#6b7280",
  fontSize: 14,
  marginTop: 6,
};

const actionsStyle = {
  display: "flex",
  gap: 8,
  marginTop: 12,
};

const btnStyle = {
  padding: "9px 10px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "white",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const btnPrimaryStyle = {
  background: "#111827",
  color: "white",
  borderColor: "#111827",
};
