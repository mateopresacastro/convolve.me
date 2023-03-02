import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-screen flex h-screen flex-col items-center justify-center overflow-hidden bg-zinc-100">
      {children}
    </main>
  );
};

export default Layout;
