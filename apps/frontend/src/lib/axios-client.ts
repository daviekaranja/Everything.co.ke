import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer ? process.env.API_BASE_URL : "/api";

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
