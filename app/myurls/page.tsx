"use client";

import { useUser } from "@clerk/nextjs";
import { ScaleLoader } from "react-spinners";
import { useState, useEffect } from "react";
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

    if (isSignedIn) {
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
    else{
      setloading(false);
    }
  }, [isLoaded, isSignedIn]);

   if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-[100vh] w-[95vw]">
        <ScaleLoader color="#ffffff" />
      </div>
    );

  else if(!isSignedIn){
    return(
      <>
      <Navbar/>
      <p className="flex justify-center items-center h-full w-full text-xl sm:text-2xl md:text-3xl font-bold text-center px-2 text-white">
        Sign in to see your urls
      </p>
      </>
    )
    
  }
  else{

    return (
      <>
        <Navbar />
        
        {urls.length === 0 && loading ? (
          <p className="flex justify-center items-center h-full w-full text-xl sm:text-2xl md:text-3xl font-bold text-center px-2 text-white">
          This account doesn't have any generated urls
        </p>
        ) : (
          <div className="flex justify-center items-center overflow-x-auto px-2">
            <table className="mt-20 text-white min-w-[300px] w-full max-w-2xl border-collapse border border-gray-400 bg-gray-900 text-xs sm:text-sm md:text-base">
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
                    
                     <a href={`${url.shortId}`} target="_blank">
                      url-shortener-iota-drab.vercel.app/{url.shortId}
                     </a>
          
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
 
}

export default Urls;


