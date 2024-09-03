"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useAtomValue } from "jotai";
import { forwardRef, useMemo } from "react";

import GitHubLink from "@/components/footer";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import Inputs from "@/components/inputs";
import Result from "@/components/result";
import Processing from "@/components/processing";

import { audioAtom, isProcessingAtom } from "@/lib/atoms";

const transition = {
  type: "spring",
  bounce: 0.4,
  filter: { transition: { bounce: 0 } },
};

export default function App() {
  const isProcessing = useAtomValue(isProcessingAtom);
  const { result } = useAtomValue(audioAtom);

  const Component = result ? Result : Inputs;

  return (
    <MotionConfig transition={transition}>
      <Title />
      <AnimatePresence mode="popLayout">
        {isProcessing ? <Processing /> : <Component />}
      </AnimatePresence>
      <StartButton />
      <GitHubLink />
    </MotionConfig>
  );
}
