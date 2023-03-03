import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-screen flex h-screen flex-col items-center justify-center overflow-hidden bg-zinc-100">
      <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 p-10 shadow-lg">
        {children}
      </div>
    </main>
  );
};

export default Layout;
