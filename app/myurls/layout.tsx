import type { Metadata } from "next";
import { ClerkProvider} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "My Urls",
  description: "From here you can generate shortlink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
     <ClerkProvider>
   
        {children}
      
    </ClerkProvider>
  );
}
