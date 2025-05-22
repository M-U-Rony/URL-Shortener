import type { Metadata } from "next";
import { ClerkProvider} from '@clerk/nextjs'
import "./globals.css";

export const metadata: Metadata = {
  title: "Home",
  description: "From here you can generate shortlink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
     <ClerkProvider>
      <html lang="en">
        <body className="vsc-initialized" data-new-gr-c-s-check-loaded="14.1235.0" data-gr-ext-installed="">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
