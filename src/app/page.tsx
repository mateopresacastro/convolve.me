"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useAtomValue } from "jotai";

import GitHubLink from "@/components/footer";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import Inputs from "@/components/inputs";
import Result from "@/components/result";

import { audioAtom, isProcessingAtom } from "@/lib/atoms";

import { useMemo } from "react";

export default function App() {
  const { result } = useAtomValue(audioAtom);
  const isProcessing = useAtomValue(isProcessingAtom);

  const Component = useMemo(() => {
    if (isProcessing) return () => <h1>Processing...</h1>;
    if (result) return Result;
    return Inputs;
  }, [result, isProcessing]);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.4,
        filter: { transition: { bounce: 0 } },
      }}
    >
      <Title />
      <AnimatePresence mode="wait">
        <Component />
      </AnimatePresence>
      {isProcessing ? null : <StartButton />}
      <GitHubLink />
    </MotionConfig>
  );
}
