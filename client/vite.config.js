import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //This tells Vite to proxy requests starting with /api/
    //to your Express server running on http://localhost:5000
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false, //Set to true if using HTTPS
      },
    },
  },
});
