"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ScaleLoader } from "react-spinners";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isLoaded } = useUser();

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <ScaleLoader />
      </div>
    );
  else {
    return (
      <nav className="bg-blue-600 text-white py-2 px-2 sm:py-3 sm:px-4 md:py-4 md:px-6 shadow-md flex flex-col sm:flex-row items-center relative">
        <div className="flex-1 flex justify-center">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            URL SHORTENER
          </p>
        </div>
        <div className="absolute right-4 top-2 sm:static flex gap-3 sm:gap-4 md:gap-6 w-auto justify-end">
          <Link href={"/myurls"}>MyUrls</Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    );
  }
}
