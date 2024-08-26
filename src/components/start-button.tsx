import ResultModal from "./result-modal";
import { useState } from "react";
import { RingLoader } from "react-spinners";
import { getAudioUtils, audioBufferToWave } from "../lib/audio-utils";
import { AnimatePresence, motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { useAtomValue } from "jotai";
import { audioBuffersAtom } from "@/lib/jotai";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });
export default function StartButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [renderedBuffer, setRenderedBuffer] = useState<AudioBuffer | null>(
    null
  );

  const [convolvedSampleWaveFile, setConvolvedSampleWaveFile] =
    useState<Blob | null>(null);

  const { firstSample, secondSample } = useAtomValue(audioBuffersAtom);

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
      const renderedBuffer = await offlineCtx.startRendering();
      setRenderedBuffer(renderedBuffer);
      const waveFile = await audioBufferToWave(renderedBuffer);
      setConvolvedSampleWaveFile(waveFile);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isDisabled = firstSample === null || secondSample === null;

  return (
    <div className="flex h-24 w-full items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {isDisabled ? null : (
          <>
            <motion.button
              onClick={handleConvolve}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              disabled={isDisabled}
              className={clsx(
                inter.className,
                "flex h-8 w-24 items-center justify-center rounded-md text-neutral-700"
              )}
              initial={{
                opacity: 0,
                filter: "blur(1px)",
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                filter: "blur(1px)",
                scale: 0.9,
              }}
              key="start-button"
            >
              <motion.span
                className="absolute left-0"
                initial={{ opacity: 0 }}
                animate={{
                  x: isHovering ? 9 : 0,
                  opacity: isHovering ? 1 : 0,
                  filter: isHovering ? "blur(0px)" : "blur(1px)",
                }}
              >
                <BsArrowRight />
              </motion.span>
              <p className="cursor-pointer">
                {isProcessing ? (
                  <RingLoader size={19} color="#075985" />
                ) : (
                  "Start"
                )}
              </p>
            </motion.button>
            <ResultModal
              onClose={() => setShowModal(false)}
              sample={convolvedSampleWaveFile}
              buffer={renderedBuffer}
              isShowing={showModal}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
