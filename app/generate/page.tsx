"use client";
import { FaRegClipboard } from "react-icons/fa";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Navbar from "@/components/navbar";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip"
import { toast } from "sonner"


function GenerateUrl() {

  const [shortUrl, setShortUrl] = useState("");
  const [loading, setloading] = useState(false);

  const handlecopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setloading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/handleurl", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setloading(false);

    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    } else {
      alert(data.error || "An error occurred");
    }
  };

  return (
    <>
    <Navbar/>
    
    <main className="flex justify-center items-center h-[85vh] px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4 text-white"
        >
          <div>
            <label
              htmlFor="input"
              className="block text-white font-semibold mb-1"
            >
              Enter URL
            </label>
            <input
              onChange={() => setShortUrl("")}
              type="text"
              id="input"
              name="input"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="output"
              className="block font-semibold mb-1"
            >
              Shortened URL
            </label>

            <div className="flex items-center">
              <input
                type="text"
                id="output"
                value={shortUrl}
                readOnly
                className="w-[90%] px-4 py-2 border border-gray-300 rounded-lg"
              />

              {loading ? (
                <ClipLoader color="#d1d5dc" />
              ) : (
                <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>


                  <FaRegClipboard
                  className="ml-[10px] cursor-pointer text-4xl text-white"
                  
              
                 onClick={(e) => {

                  e.preventDefault();
                  handlecopy();
                  toast("URL copied to clipboard!");
                }}
                />


                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy to Clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

                
              )}
            </div>

          </div>


          <button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-lg border border-gray-300 animate-pulse cursor-pointer"
          >
            Generate
          </button>
        </form> 
      </main>
    </>
  )
}

export default GenerateUrl