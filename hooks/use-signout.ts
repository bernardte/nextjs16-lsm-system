"use client";

import { authClient } from "@/lib/better-auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("successfully logged out");
        },
        onError: () => {
          toast.error("Failed to sign out. Please try again later....");
        }
      }
    });
  };

  return handleSignOut;
};
