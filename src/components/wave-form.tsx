import { useRef, useEffect } from "react";
import wavesurfer from "wavesurfer.js";
import WaveSurfer from "wavesurfer.js";
import { audioBufferToWave } from "../lib/audio-utils";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface WaveFormProps {
  sample: AudioBuffer | Blob | null;
  id: "firstSample" | "secondSample" | "result";
}

export default function WaveForm({ sample, id }: WaveFormProps) {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waveformRef.current || !sample) return;
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

    return () => wavesurfer && wavesurfer.destroy();
  }, [sample]);

  return (
    <AnimatePresence mode="wait">
      {sample ? (
        <motion.div
          key="waveform"
          className={clsx(
            "flex h-16 w-80 flex-col items-center justify-evenly overflow-hidden"
          )}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            y: 100,
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            filter: { transition: { type: "easeOut" } },
          }}
          style={{ borderRadius: "0.375rem" }}
          layoutId={`${id}-waveform`}
        >
          <motion.div
            ref={waveformRef}
            className="w-full overflow-hidden px-9"
          ></motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
