"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ScaleLoader } from "react-spinners";
import Image from "next/image";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isLoaded } = useUser();

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <ScaleLoader color="#ffffff" />
      </div>
    );
  else {
    return (
   
      <nav className="bg-gray-950 text-white  flex items-center justify-between w-[98vw] pt-3 fixed mt-0">
        <Link href={'/'} className="pl-6">
        <Image src={'/Cut.png'} alt="Logo" height={60} width={60}/>
        </Link>
        <div className=" flex gap-4">
          <Link href={"/myurls"}><button className="px-9 py-3 rounded-xl bg-gray-950 border-1 border-white transition text-white font-medium cursor-pointer">
           My Urls
          </button></Link>
          

          <div className="flex items-center gap-4 justify-center">
                    <SignedOut>
                      <SignInButton forceRedirectUrl="/generate">
                    <button className="px-9 py-3 rounded-xl bg-gray-950 border-1 border-white transition text-white font-medium cursor-pointer">
                     Sign In
                    </button>
                      </SignInButton>
                    </SignedOut>

                <SignedIn>

                      <UserButton/>
                </SignedIn>
                   
                    
          </div>
          
        </div>
      </nav>

    );
  }
}
