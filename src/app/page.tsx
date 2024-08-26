"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useAtomValue } from "jotai";
import { forwardRef, useMemo } from "react";

import GitHubLink from "@/components/footer";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import Inputs from "@/components/inputs";
import Result from "@/components/result";

import { audioAtom, isProcessingAtom } from "@/lib/atoms";

const Processing = forwardRef(function Processing() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(1px)" }}
      className="flex md:h-[128px] h-[328px] w-full items-center justify-center text-sm"
    >
      Processing
    </motion.div>
  );
});

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
