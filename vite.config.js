import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Allow .jsx syntax in .jsx files and expose the dev server on the network
// so the remote container's port can be forwarded for preview.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
});
