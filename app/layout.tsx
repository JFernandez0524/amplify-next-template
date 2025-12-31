import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigureAmplifyClientSide } from "./components/ConfigureAmplify";
import ChatWidget from "@/src/components/chat/ChatWidget";
import Navigation from "@/src/components/navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Next.js App",
  description: "A modern Next.js app with SSR and membership-based access",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide>
          <Navigation />
          {children}
          <ChatWidget />
        </ConfigureAmplifyClientSide>
      </body>
    </html>
  );
}
