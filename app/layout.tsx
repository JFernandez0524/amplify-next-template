import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import { ConfigureAmplifyClientSide } from "./components/ConfigureAmplify";

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
          {children}
        </ConfigureAmplifyClientSide>
      </body>
    </html>
  );
}
