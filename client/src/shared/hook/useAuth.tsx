import { useMutation } from "@tanstack/react-query";
import { logout } from "@/shared/apis/Auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/authStore";

export default function useAuth() {
  const router = useRouter();

  const clearUser = useAuthStore((s) => s.clearUser);

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
  };
}
