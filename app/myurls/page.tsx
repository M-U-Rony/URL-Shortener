"use client";

import { useUser } from "@clerk/nextjs";
import { ScaleLoader } from "react-spinners";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";

function Urls() {
  interface Url {
    originalUrl: string;
    shortId: string;
    clicks: number;
  }
  const { isLoaded, isSignedIn } = useUser();
  const [urls, seturls] = useState<Url[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      const fetchurls = async () => {
        try {
          const res = await fetch("/api/userurls");
          const data = await res.json();

          seturls(data.urls);
          setloading(false);
        } catch (error) {
          console.error("Failed to fetch URLs", error);
        }
      };

      fetchurls();
    }
  }, [isLoaded, isSignedIn]);

  if(!isSignedIn){
    return(
      <>

      <Navbar/>
      <p className="flex justify-center items-center w-full mt-20 text-xl sm:text-2xl md:text-3xl font-bold text-center px-2">
        Sign in to see your urls
      </p>
      </>
    )
    
  }
  else if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <ScaleLoader />
      </div>
    );


  return (
    <>
      <Navbar />
      <Link href={"/"}>
        <button className="cursor-pointer m-4 bg-blue-600 h-10 w-32 rounded text-white">
          Back to home
        </button>
      </Link>
      {urls.length === 0 ? (
        <p className="flex justify-center items-center w-full mt-20 text-xl sm:text-2xl md:text-3xl font-bold text-center px-2">
          This account doesn't generate any urls
        </p>
      ) : (
        <div className="flex justify-center items-center w-full overflow-x-auto px-2">
          <table className="min-w-[320px] w-full max-w-2xl border-collapse border border-gray-400 bg-white text-xs sm:text-sm md:text-base">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 sm:px-8 py-2 sm:py-4">
                  Urls
                </th>
                <th className="border border-gray-400 px-2 sm:px-6 py-2 sm:py-4">
                  Clicks
                </th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 sm:px-8 py-2 text-center break-all">
                   url-shortener-iota-drab.vercel.app/{url.shortId}
                  </td>
                  <td className="border border-gray-400 px-2 sm:px-6 py-2 text-center">
                    {url.clicks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      )}

      <div className="h-[30px]">

      </div>
    </>
  );
}

export default Urls;


