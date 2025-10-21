// src/lib/hoverBubble.js
let cleanup = null;

/** Inicia o efeito de bubble para qualquer elemento com .hover-bubble */
export function initHoverBubble() {
  // evita inicializar duas vezes
  if (cleanup) return cleanup;

  const onMove = (e) => {
    const el = e.target.closest(".hover-bubble");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const onLeave = (e) => {
    const el = e.target.closest(".hover-bubble");
    if (!el) return;
    el.style.removeProperty("--x");
    el.style.removeProperty("--y");
  };

  // Delegação no documento (cobre todos os botões/links)
  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerleave", onLeave, true);

  cleanup = () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave, true);
    cleanup = null;
  };

  return cleanup;
}
