"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/better-auth/auth-client";
import { useRouter } from "next/navigation";


export default function Home() {

  const { 
      data: session, 
  } = authClient.useSession();
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
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
          <Button>Logout</Button>
        </div>
        ): (
          <Button onClick={signOut}>Login</Button>
        )
      }
    </div>
  );
}
