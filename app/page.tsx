import Link from "next/link";
import { SignInButton, SignedOut} from "@clerk/nextjs";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
    <Navbar/>

    <main className="h-[100vh] bg-gray-950 text-white flex flex-col items-center justify-center px-6 py-12 w-[98vw]">
      
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-80 animate-bounce">
          Simplify Your Links
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Your ultimate tool for shortening, tracking, and managing URLs in seconds.
        </p>
        <div className="flex items-center gap-4 justify-center">
          <SignedOut>
            <SignInButton forceRedirectUrl="/generate">
          <button className="px-9 py-3 rounded-xl bg-gray-950 border-1 border-white transition text-white font-medium cursor-pointer">
           Sign In
          </button>
            </SignInButton>
          </SignedOut>
          
          <Link href={'/generate'}> <button className="px-6 py-3 rounded-xl bg-gray-950 border-1 border-white transition text-white font-medium cursor-pointer">
           Generate
          </button> </Link>
          
        </div>
      </div>


      <section className="mt-20 max-w-4xl w-full text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Fast & Easy</h3>
            <p className="text-gray-400">Shorten links instantly with just one click.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-gray-400">Track clicks with powerful analytics.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-400">Your data is protected with end-to-end encryption. We never track or store your private links.</p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
