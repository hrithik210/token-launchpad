import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WalletConnectionProvider from "./context/WalletConnectionProvider";
import { Toaster } from "sonner";
import { NetworkProvider } from "./context/NetworkContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://token-launchpad.vercel.app"),
  title: "Token Launchpad — Launch your own token on Solana in minutes",
  description:
    "Create, configure, and mint your own SPL token on Solana — no code required. Connect your wallet and go live on devnet or mainnet in minutes.",
  openGraph: {
    title: "Token Launchpad — Launch your own token on Solana",
    description:
      "Create and mint your own SPL token on Solana. No code, just your wallet.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Launchpad — Launch your own token on Solana",
    description:
      "Create and mint your own SPL token on Solana. No code, just your wallet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a]`}
      > 
      
      <NetworkProvider>
         <WalletConnectionProvider>
              {children}
              <Toaster />
          </WalletConnectionProvider>

      </NetworkProvider>
      
      </body>
    </html>
  );
}
