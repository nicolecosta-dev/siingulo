// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base diferente pra dev e prod (GH Pages precisa do subpath)
  base: process.env.NODE_ENV === "production" ? "/siingulo/" : "/",
  build: { outDir: "docs" },
});
