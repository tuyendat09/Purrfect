import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import StoreProvider from "../StoreProvider";
import "../globals.css";
import { Toaster } from "react-hot-toast";

const dmSANS = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Purrfect - Log in",
  description: "Purrfect - Log in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${dmSANS.variable} ${playfairDisplay.variable}  antialiased`}
      lang="en"
    >
      <body suppressHydrationWarning>
        <StoreProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: `
            !bg-black 
            !text-white 
            !rounded-full 
            !text-[14px]
            !max-w-[800px]
       `,
            }}
          />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
