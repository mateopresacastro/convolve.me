"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useAtomValue } from "jotai";

import GitHubLink from "@/components/footer";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import Inputs from "@/components/inputs";
import Result from "@/components/result";
import Processing from "@/components/processing";

import { audioAtom, isProcessingAtom } from "@/lib/atoms";

const transition = {
  type: "spring",
  bounce: 0.25,
  filter: { transition: { bounce: 0 } },
};
const initial = {
  opacity: 0,
  transform: "translateY(10px)",
  filter: "blur(1px)",
};

const animate = {
  opacity: 1,
  transform: "translateY(0px)",
  filter: "blur(0px)",
  transition: { delay: 0.3 },
};

export default function App() {
  const isProcessing = useAtomValue(isProcessingAtom);
  const { result } = useAtomValue(audioAtom);

  const Component = result ? Result : Inputs;

  return (
    <MotionConfig transition={transition}>
      <motion.div initial={initial} animate={animate}>
        <Title />
        <AnimatePresence mode="popLayout">
          {isProcessing ? <Processing /> : <Component />}
        </AnimatePresence>
        <StartButton />
      </motion.div>
      <GitHubLink />
    </MotionConfig>
  );
}
