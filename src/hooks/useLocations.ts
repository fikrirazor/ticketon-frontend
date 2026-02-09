import { useQuery } from "@tanstack/react-query";
import { locationAPI } from "../lib/api.service";

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => locationAPI.getLocations(),
    staleTime: 1000 * 60 * 60, // 1 hour (locations don't change often)
  });
};
