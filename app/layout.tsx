import type { Metadata } from "next";
import { Header } from "@/components/molecules";
import { Toaster } from "@/components/ui";
import "./globals.css";

import { Josefin_Sans } from "next/font/google";

import { TanstackProvider } from "@/lib/providers/TanstackProvider";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProvider>
      <html lang="en">
        <body
          className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
        >
          <Header />

          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">{children}</main>
            <Toaster richColors position="bottom-right" />
          </div>
        </body>
      </html>
    </TanstackProvider>
  );
}
