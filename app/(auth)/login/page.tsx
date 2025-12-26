import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>Login with your GitHub or Email Account</CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant={"outline"} className="w-full">
          <GithubIcon className="size-4"/>
            Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoginPage;
