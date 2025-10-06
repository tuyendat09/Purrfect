import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, logout } from "@/shared/apis/Auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/authStore";
import { useEffect } from "react";

export default function useUser() {
  const router = useRouter();

  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  const { data, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
    if (error) {
      router.push("/auth");
    }
  }, [data, error, router, setUser]);

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();
      router.push("/auth");
    },
  });

  function handleLogout() {
    mutation.mutate();
  }

  return {
    handleLogout,
    data,
  };
}
