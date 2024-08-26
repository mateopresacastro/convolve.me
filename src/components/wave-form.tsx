import WaveSurfer from "wavesurfer.js";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { useRef, useEffect } from "react";

import { audioAtom } from "@/lib/atoms";
import { audioBufferToWave } from "@/lib/audio-utils";

import { Id } from "@/types";

export default function WaveForm({ id }: { id: Id }) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const audioBuffers = useAtomValue(audioAtom);
  const sample = audioBuffers[id];

  useEffect(() => {
    if (!sample || !waveformRef.current) return;

    const OPTIONS = {
      container: waveformRef.current,
      barHeight: 5,
      barWidth: 1,
      height: 30,
      normalize: true,
      waveColor: "#a1a1aa",
      progressColor: "#3f3f46",
      cursorColor: "#f4f4f5",
      hideScrollbar: true,
    };

    const wavesurfer = WaveSurfer.create(OPTIONS);

    (async () => {
      const waveFile =
        sample instanceof AudioBuffer
          ? await audioBufferToWave(sample)
          : sample;

      wavesurfer.loadBlob(waveFile);
    })();

    return () => {
      setTimeout(() => {
        wavesurfer.destroy();
      }, 50);
    };
  }, [sample]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {sample ? (
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(4px)",
            transform: "translateY(-17px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transform: "translateY(0px)",
          }}
          exit={{
            opacity: 0,
            filter: "blur(4px)",
            transform: "translateY(-17px)",
          }}
          className="flex h-16 w-80 flex-col items-center justify-center overflow-hidden"
          key={`waveform-${id}`}
        >
          <motion.div
            ref={waveformRef}
            className="w-full overflow-hidden px-6"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
