import clsx from "clsx";

import { Provider } from "jotai";
import { Inter } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "convolve.me",
  description: "Convolve two audio files together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={clsx(
            inter.className,
            "flex h-screen w-screen items-center justify-center bg-neutral-50"
          )}
        >
          <main className="flex max-w-[50rem] flex-col items-center justify-center">
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}
