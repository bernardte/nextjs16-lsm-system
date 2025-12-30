import { ThemeToggle } from "@/components/ui/themeToggle";
import { auth } from "@/lib/better-auth/auth";


export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  return (
    <div>
      <h1 className="">Hello world</h1>
      <ThemeToggle />
    </div>
  );
}
