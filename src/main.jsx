// src/main.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const useHash =
  import.meta.env.VITE_USE_HASH === "true" ||
  window.location.protocol === "file:";

const Router = useHash
  ? ({ children }) => <HashRouter>{children}</HashRouter>
  : ({ children }) => (
      <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
        {children}
      </BrowserRouter>
    );

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // sobe ao trocar de rota
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return null;
}
function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    // usa o título atual (definido pelo Seo.jsx) ou o path
    const title = document.title?.trim();
    setMsg(`Navegou para ${title || pathname}`);
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        margin: -1,
        border: 0,
        padding: 0,
        clip: "rect(0 0 0 0)",
        overflow: "hidden",
      }}
    >
      {msg}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <RouteAnnouncer />
      <App />
    </Router>
  </React.StrictMode>
);
