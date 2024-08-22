import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-screen flex h-screen flex-col items-center justify-between overflow-hidden bg-zinc-100">
      {children}
    </main>
  );
}
