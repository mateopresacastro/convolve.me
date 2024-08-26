"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";

import GitHubLink from "@/components/footer";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import Input from "@/components/input";
import Result from "@/components/result";

import { audioAtom } from "@/lib/jotai";
import { useAtomValue } from "jotai";

import type { TFileInput } from "@/types";

const inputs: Array<TFileInput> = [
  {
    label: "Sample one",
    id: "firstSample",
  },
  {
    label: "Sample two",
    id: "secondSample",
  },
];

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
        {result ? (
          <Result />
        ) : (
          <motion.div
            className="flex w-full flex-col items-center md:flex-row md:gap-0 gap-6 py-6 md:py-0"
            initial={{ opacity: 0, filter: "blur(1px)" }}
            exit={{ opacity: 0, filter: "blur(1px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            key="main-inputs"
          >
            {inputs.map(({ id, label }, i) => (
              <Input key={id} label={label} id={id} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <StartButton />
      <GitHubLink />
    </MotionConfig>
  );
}
1;
