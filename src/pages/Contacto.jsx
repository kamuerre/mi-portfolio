import { useState } from "react";

export default function Contacto() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;

    try {
      const res = await fetch("https://formspree.io/f/xeelqjqv", {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="container stack-lg">
      <h1>Contacto</h1>

      <section className="grid-2">
        <div className="card stack">
          <h2>Mensaje</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="field">
                <span className="field__label muted">Nombre</span>
                <input
                  className="input"
                  name="name"
                  placeholder="Tu nombre"
                  required
                />
              </label>

              <label className="field">
                <span className="field__label muted">Email</span>
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  required
                />
              </label>

              <label className="field field--full">
                <span className="field__label muted">Mensaje</span>
                <textarea
                  className="input textarea"
                  name="message"
                  placeholder="Contame en qué puedo ayudarte…"
                  rows={6}
                  required
                />
              </label>
            </div>

            <input
              type="hidden"
              name="_subject"
              value="Nuevo mensaje desde el portfolio"
            />

            <div className="btn-row">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando…" : "Enviar"}
              </button>
            </div>

            {status === "success" && (
              <p className="muted">Mensaje enviado correctamente.</p>
            )}

            {status === "error" && (
              <p className="muted">
                Hubo un error. Intentá nuevamente más tarde.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
