"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/better-auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Home() {

  const { 
      data: session, 
  } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("successfully logged out");
        }
      }
    })
  }

  return (
    <div>
      <h1>Hello world</h1>
      <ThemeToggle />
      {
        session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={handleSignOut}>Logout</Button>
        </div>
        ): (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )
      }
    </div>
  );
}
