'use client';

import { useState } from 'react';

export default function Home() {
  const [shortUrl, setShortUrl] = useState(''); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/handleform', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    } else {
      alert(data.error || 'An error occurred');
    }
  };

  return (
    <>
      <nav className="flex align-middle justify-center p-4">
        URL SHORTENER
      </nav>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input">Enter Url:</label>
          <input type="text" id="input" name="input" required />
          <label htmlFor="output">Generated Url:</label>
          <input type="text" id="output" value={shortUrl} readOnly />
          <button type="submit">Generate</button>
        </form>
      </main>
    </>
  );
}