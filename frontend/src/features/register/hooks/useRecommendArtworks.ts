import { getArtworks } from "@/shared/api/register";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useRecommendArtworks() {
  const {
    data = [],
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["recommend-artworks"],
    queryFn: getArtworks,
  });
  return { data, isFetching, error, isError };
}

export function usePrefetchRecommendArtworks() {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["recommend-artworks"],
    queryFn: getArtworks,
  });
}
