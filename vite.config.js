import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Vite only builds index.html by default, so privacy.html has to be named
    // explicitly or it never reaches dist/ and the footer link 404s in production.
    rollupOptions: {
      input: {
        index: "index.html",
        privacy: "privacy.html",
      },
    },
  },
});
