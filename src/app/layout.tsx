import clsx from "clsx";

import { Provider } from "jotai";
import { GeistMono } from "geist/font/mono";

import type { Metadata } from "next";
import "./globals.css";

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
            GeistMono.className,
            "flex h-screen w-screen items-center justify-center bg-neutral-50",
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
