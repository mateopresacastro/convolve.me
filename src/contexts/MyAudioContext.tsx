import { createContext, useState } from "react";
import type { ReactNode } from "react";

export const MyAudioContext = createContext(new AudioContext());

interface AudioContextProvider {
  children: ReactNode;
}

export default function MyAudioContextProvider({
  children,
}: AudioContextProvider) {
  const [ctx] = useState(new AudioContext());
  return (
    <MyAudioContext.Provider value={ctx}>{children}</MyAudioContext.Provider>
  );
}
