'use client';
import { FaRegClipboard } from "react-icons/fa";

import { useState } from 'react';
import { ClipLoader } from "react-spinners";

export default function Home() {

  const [shortUrl, setShortUrl] = useState('');
  const [copied,setcopied] = useState(false);
  const [loading,setloading] = useState(false);
  
  
  const handlecopy = async() =>{

     try {
      await navigator.clipboard.writeText(shortUrl);
      setcopied(true);
      setTimeout(() => setcopied(false), 2000);
     
    } catch (err) {
      console.error('Failed to copy:', err);
    }

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    setloading(true);
    e.preventDefault(); 

    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/handleurl', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setloading(false);

    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    } else {
      alert(data.error || 'An error occurred');
    }
  };

  return (
    <>

 <nav className="bg-blue-600 text-white py-4 px-6 shadow-md relative h-[60px text-center">

    <p className="text-3xl font-bold">
      URL SHORTENER
    </p>

</nav>


  <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
    >
      <div>
        <label 
          htmlFor="input" 
          className="block text-gray-700 font-semibold mb-1"
        >
          Enter URL
        </label>
        <input
          type="text"
          id="input"
          name="input"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label 
          htmlFor="output" 
          className="block text-gray-700 font-semibold mb-1"
        >
          Shortened URL
        </label>

        <div className="flex items-center">

        <input
          type="text"
          id="output"
          value={shortUrl}
          readOnly
          className="w-[90%] px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
        />

        {
        loading
        ?
        <ClipLoader  />
        :
        <FaRegClipboard className="ml-[10px] cursor-pointer text-4xl text-blue-600" onClick={handlecopy} />
        }
        </div>
        
        {copied? <p className="text-green-500 m-2">Url copied to clipboard</p>:null}

      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Generate
      </button>
    </form>
  </main>
</>

  );
}