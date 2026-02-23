import { useQuery, QueryKey } from "@tanstack/react-query";

// 1. The Dynamic Fetcher
// TanStack passes an object to the queryFn containing the queryKey
const fetchServices = async ({ queryKey }: { queryKey: QueryKey }) => {
  // Destructure the parts of the key we need
  // [ 'services', endpoint, params ]
  const [_key, endpoint, params] = queryKey;

  // Construct the URL dynamically
  const queryParams = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  const url = `api/services/${endpoint}?${queryParams}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch services");
  }

  return response.json();
};

const useServices = (endpoint = "filtered", params = { limit: 50 }) => {
  return useQuery({
    // 2. IMPORTANT: The key now changes when endpoint or params change
    queryKey: ["services", endpoint, params],
    queryFn: fetchServices,

    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export default useServices;
