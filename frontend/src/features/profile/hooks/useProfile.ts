import { getProfileAPI } from "@/shared/api/user";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
  });

  return {
    profileData,
    isLoading,
    isError,
    error,
  };
}
