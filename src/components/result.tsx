import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/inputs";

import { audioAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { audioBufferToWave, download } from "@/lib/audio-utils";

// forwardRef needed by framer-motion
const Result = forwardRef(function Result() {
  const id = "result";
  const label = "Result";
  const { result } = useAtomValue(audioAtom);

  async function handleDownload() {
    if (!result) return;
    const waveFile = await audioBufferToWave(result);
    download(waveFile);
  }

  return (
    <motion.div
      className="flex h-[329px] w-full flex-col items-center justify-center gap-6 py-6 md:h-[128px] md:gap-0 md:py-0"
      initial={{ opacity: 0, filter: "blur(1px)" }}
      exit={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      key="main-inputs"
    >
      <Input key={id} label={label} id={id} />
      <motion.button
        onClick={handleDownload}
        key="download-button"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="relative top-10 flex h-8 w-24 items-center justify-center bg-neutral-800 py-2 text-xs text-neutral-100"
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(1px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(1px)",
        }}
        style={{ borderRadius: 5 }}
      >
        Download
      </motion.button>
    </motion.div>
  );
});

export default Result;
