"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/better-auth/auth-client";
import { GithubIcon, Loader, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
    const [gitHubPending, startGitHubTransition] = useTransition();
    const [emailPending, startEmailTransition] = useTransition();
    const router = useRouter();
    const [email, setEmail] = useState("");

    const signInWithGitHub = async () => {
      startGitHubTransition(async () => {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success(
                "successfully signed in with GitHub, you will be redirected shortly..."
              );
            },
            onError: (error) => {
              const errorMessage =
                error instanceof Error ? error.error.message : "Internal Server Error";
              toast.error("error signing in with GitHub: " + errorMessage);
            },
          },
        });
      });
    };

    
  const signInWithEmail = async (e: React.FormEvent) => {
    startEmailTransition(async () => {
    e.preventDefault();
    await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: "sign-in",
      fetchOptions: {
        onSuccess: () => {
           toast.success("Email sent! Please check your inbox to continue.");
           router.push(`/verify-request`);
        },
        onError: () => {
          toast.error("Error sending email. Please try again.")
        }
      }
    })
    })

  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>
          Login with your GitHub or Email Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={gitHubPending}
          onClick={signInWithGitHub}
          variant={"outline"}
          className="w-full"
        >
          {gitHubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Signing in with GitHub...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with GitHub
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="your@example.com" 
            required
            />
          </div>

          <Button 
          onClick={signInWithEmail}
          disabled={emailPending} 
          >
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Signing in with Email...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
