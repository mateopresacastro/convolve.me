"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useAtomValue } from "jotai";

import GitHubLink from "@/components/footer";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import Inputs from "@/components/inputs";
import Result from "@/components/result";

import { audioAtom } from "@/lib/atoms";

export default function App() {
  const { result } = useAtomValue(audioAtom);
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
        {result ? <Result /> : <Inputs />}
      </AnimatePresence>
      <StartButton />
      <GitHubLink />
    </MotionConfig>
  );
}
