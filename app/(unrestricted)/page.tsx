"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/better-auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { features } from "@/lib/constant/landingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("successfully logged out");
        }
      }
    });
  };

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <Badge variant={"outline"}>The Future of Online Education</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Elevate your Learning Experience
          </h1>
          <p className="text-muted-foreground max-w-175 md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              className={buttonVariants({
                size: "lg"
              })}
              href={"/courses"}
            >
              Explore Courses
            </Link>
            <Link
              className={buttonVariants({
                size: "lg",
                variant: "outline"
              })}
              href={"/login"}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="hover: shadow-lg transition-shadow">
            <CardHeader>
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
