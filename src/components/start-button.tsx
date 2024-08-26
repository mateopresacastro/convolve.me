import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { Inter } from "next/font/google";

import { audioAtom, isProcessingAtom } from "@/lib/atoms";
import { getAudioUtils } from "@/lib/audio-utils";

const inter = Inter({ subsets: ["latin"] });

export default function StartButton() {
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [{ firstSample, secondSample }, setAudio] = useAtom(audioAtom);
  const { result } = useAtomValue(audioAtom);

  const handleConvolve = async () => {
    if (!firstSample || !secondSample) return;
    const offlineCtx = new OfflineAudioContext({
      numberOfChannels: firstSample.numberOfChannels,
      length: firstSample.length + secondSample.length,
      sampleRate: firstSample.sampleRate,
    });

    const { compressor, gain, out } = getAudioUtils(offlineCtx);

    const firstSampleSourceNode = new AudioBufferSourceNode(offlineCtx, {
      buffer: firstSample,
    });

    const convolverNode = new ConvolverNode(offlineCtx, {
      buffer: secondSample,
    });

    firstSampleSourceNode
      .connect(convolverNode)
      .connect(gain)
      .connect(compressor)
      .connect(out);

    firstSampleSourceNode.start();

    try {
      setIsProcessing(true);
      const result = await offlineCtx.startRendering();
      setAudio((prev) => ({ ...prev, result }));
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsProcessing(false), 1500);
    }
  };

  const isDisabled =
    firstSample === null ||
    secondSample === null ||
    result !== null ||
    isProcessing === true;

  return (
    <motion.div className="flex h-24 w-full items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {isDisabled ? null : (
          <motion.button
            onClick={handleConvolve}
            disabled={isDisabled}
            layoutId="start-button"
            key="start-button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={clsx(
              inter.className,
              "flex h-8 w-24 items-center justify-center text-neutral-100 bg-neutral-800 text-xs"
            )}
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
            Start
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
