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

    // create offline context to render audio
    const offlineCtx = new OfflineAudioContext({
      numberOfChannels: firstSample.numberOfChannels,
      length: firstSample.length + secondSample.length,
      sampleRate: firstSample.sampleRate,
    });

    const { compressor, gain, out } = getAudioUtils(offlineCtx);

    // create nodes
    const firstSampleSourceNode = new AudioBufferSourceNode(offlineCtx, {
      buffer: firstSample,
    });

    const convolverNode = new ConvolverNode(offlineCtx, {
      buffer: secondSample,
    });

    // connect the tree
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
      setIsProcessing(false);
    }
  };

  const isDisabled =
    firstSample === null || secondSample === null || result !== null;

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
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            style={{ borderRadius: 5 }}
          >
            {isProcessing ? "Processing..." : "Start"}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
