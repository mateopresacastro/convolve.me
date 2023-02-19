import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-900">
      {children}
    </main>
  );
};

export default Layout;
