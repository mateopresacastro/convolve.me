import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

export const MyAudioContext = createContext(new AudioContext());

const MyAudioContextProvider = ({ children }: { children: ReactNode }) => {
  const [ctx] = useState(new AudioContext());
  return (
    <MyAudioContext.Provider value={ctx}>{children}</MyAudioContext.Provider>
  );
};

export default MyAudioContextProvider;
