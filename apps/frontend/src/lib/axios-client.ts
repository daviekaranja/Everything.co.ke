import axios from "axios";

// 1. Determine the environment
const isServer = typeof window === "undefined";

// 2. Define the Base URL
// - In production server: Point to your internal API URL (e.g., Docker or private IP)
// - In development server: Point directly to FastAPI (127.0.0.1:8000)
// - In client: Use /api to trigger Next.js rewrites
const baseURL = isServer
  ? process.env.API_BASE_URL || "http://127.0.0.1:8000/api/v1"
  : "/api";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    // SERVER-SIDE COOKIE FORWARDING (Optional but Recommended)
    // If you are fetching data in sitemap.ts or Server Components and need auth
    if (isServer) {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();
      if (cookieString) {
        config.headers.Cookie = cookieString;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isServer) {
      // Only redirect on the client; on server, just throw the error
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
