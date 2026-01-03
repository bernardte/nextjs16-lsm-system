import "server-only";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma/db";
import { env } from "../env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "../resend/resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [ 
      emailOTP({ 
          async sendVerificationOTP({ email, otp }) { 
              await resend.emails.send({
                from: 'MarshalLMS <onboarding@resend.dev>',
                to: [email],
                subject: 'MarshalLMS - Verify your email',
                html: `<p>Your verification OTP is: <strong>${otp}</strong></p>`,
              });
          }, 
      })  
  ]
});

