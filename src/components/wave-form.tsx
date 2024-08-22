import { useRef, useEffect } from "react";
import wavesurfer from "wavesurfer.js";
import WaveSurfer from "wavesurfer.js";
import { AudioBuffersState } from "../app";
import { audioBufferToWave } from "../lib/audio_utils";
import { AnimatePresence, motion } from "framer-motion";

interface WaveFormProps {
  sample: AudioBuffer | Blob | null;
}

export default function WaveForm({ sample }: WaveFormProps) {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let wavesurfer: wavesurfer;
    (async () => {
      if (waveformRef.current && sample) {
        const OPTIONS = {
          container: waveformRef.current as unknown as HTMLDivElement,
          barHeight: 5,
          barWidth: 1,
          height: 30,
          normalize: true,
          waveColor: "#a1a1aa",
          progressColor: "#3f3f46",
          cursorColor: "#f4f4f5",
          hideScrollbar: true,
        };
        wavesurfer = WaveSurfer.create(OPTIONS);

        const waveFile =
          sample instanceof AudioBuffer
            ? await audioBufferToWave(sample)
            : sample;

        wavesurfer.loadBlob(waveFile);
      }
    })();

    return () => wavesurfer && wavesurfer.destroy();
  }, [sample]);

  return (
    <AnimatePresence mode="popLayout">
      {sample ? (
        <motion.div
          key="waveform"
          className="flex h-20 w-64 flex-col items-center justify-evenly overflow-hidden rounded-lg bg-zinc-100 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div ref={waveformRef} className="w-full overflow-hidden px-9"></div>
        </motion.div>
      ) : (
        <motion.div
          key="placeholder"
          className="flex h-20 w-64 flex-col items-center justify-center rounded-lg bg-zinc-100 shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className="text-xs italic text-zinc-400">No audio loaded yet...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
