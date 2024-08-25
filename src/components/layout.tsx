import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-50">
      {children}
    </main>
  );
}
