import { useEffect, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfThumb({ url, title }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    let cancelled = false;

    async function makeThumb() {
      setStatus("loading");
      setImgSrc(null);

      try {
        const pdf = await getDocument({ url }).promise;
        const page = await pdf.getPage(1);

        const rotation = (page.rotate || 0) % 360;

        // Render a buena calidad y luego lo mostramos "cover" con <img>
        const base = page.getViewport({ scale: 1, rotation });
        const targetWidth = 1000;
        const scale = targetWidth / base.width;
        const viewport = page.getViewport({ scale, rotation });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { alpha: false });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        // Fondo blanco
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport }).promise;

        if (cancelled) return;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        setImgSrc(dataUrl);
        setStatus("ok");
      } catch (e) {
        console.error("PdfThumb error:", url, e);
        if (!cancelled) setStatus("error");
      }
    }

    makeThumb();
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (status === "error") {
    return (
      <div style={{ fontWeight: 900, color: "#111827" }} aria-label={`PDF - ${title}`}>
        PDF
      </div>
    );
  }

  if (!imgSrc) {
    return (
      <div style={{ fontWeight: 700, color: "#6b7280" }} aria-label={`Cargando - ${title}`}>
        Cargando…
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={`Miniatura - ${title}`}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      loading="lazy"
    />
  );
}
