"use client";

import Image from "next/image";
import Logo from "@/public/Logo/Logo.png";
import Link from "next/link";
import { navigationItems } from "@/lib/constant/landingPage";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/better-auth/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropDown from "./UserDropDown";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  console.log("Navbar session: ", session);
  return (
    <header className="bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full overflow-hidden border-b-2">
      <Link
        href="/"
        className="absolute left-4 flex items-center justify-center md:left-6 lg:left-8"
      >
        <Image src={Logo} alt="Logo" width={80} height={80} />
      </Link>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Spacer to balance the absolute logo */}
        <div className="w-20" />
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:justify-center">
          <div className="flex space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme toggle button */}
          <ThemeToggle />
          {isPending ? null : session ? (
            <UserDropDown
              email={session.user.email || ""}
              imageUrl={session.user.image || ""}
              name={session.user.name || ""}
            />
          ) : (
            <>
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "secondary" })}
              >
                Login
              </Link>
              <Link href={"/"} className={buttonVariants()}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
