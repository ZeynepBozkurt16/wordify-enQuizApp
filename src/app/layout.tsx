import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Navbar from './components/Navbar';
import "./globals.css";



const raleway = Raleway({ subsets: ["latin"] , 
  weight: ["200", "300", "400", "500", "600","700","800","900"],
 });

export const metadata: Metadata = {
  title: "Wordify",
  description: "Quiz questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={raleway.className}>
        <div className='mx-36 text-2xl' >
          <ClerkLoading>
              <div className='flex flex-col items-center text-center mt-32' >
                LOADING...
              </div>
        
        </ClerkLoading>
            <ClerkLoaded>
            <Navbar/>
            {children}
            </ClerkLoaded>
         
        </div>
        
        
        </body>
    </html>
    </ClerkProvider>
  );
}