import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: `http://localhost:8000/openapi.json`, // 👈 This reads the API base URL from an environment variable
  output: "src/lib/types/api", // 👈 This is where the generated code will be saved
  plugins: [
    "@hey-api/client-fetch",
    "zod", // 👈 This generates Zod schemas for every model and endpoint
  ],
});
