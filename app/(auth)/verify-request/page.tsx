"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/better-auth/auth-client";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const VerifyRequestPage = () => {
  const [otp, setOtp] = useState("");
  const [otpPending, startOTPTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") || ("" as string);
  const decodedEmail = decodeURIComponent(email);
  const router = useRouter();

  const verifyOTP = () => {
    startOTPTransition(async () => {
      await authClient.signIn.emailOtp({
        email: decodedEmail,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Email verified successfully! You are now signed in."
            );
            router.push("/");
          },
          onError: () => {
            toast.error("Invalid OTP. please try again.");
          }
        }
      });
    });
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification email code to your email address. Please
          open the email and paste the code below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2"
          >
            <InputOTPGroup autoFocus>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Button
          className="w-full"
          onClick={verifyOTP}
          disabled={otpPending || otp.length !== 6}
        >
          {otpPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>verifying...</span>
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequestPage;
