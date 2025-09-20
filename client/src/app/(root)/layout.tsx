import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import StoreProvider from "../StoreProvider";
import "../globals.css";
import Container from "@/shared/components/Container";
import Header from "@/shared/components/Header/Header";

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
  title: "Purrfect",
  description: "Cozy corner for cat lover",
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
        <Container>
          <StoreProvider>
            <Header />
            {children}
          </StoreProvider>
        </Container>
      </body>
    </html>
  );
}
