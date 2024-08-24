import { useState } from "react";
import { RingLoader } from "react-spinners";
import { getAudioUtils, audioBufferToWave } from "../lib/audio_utils";
import ResultModal from "./result-modal";
import type { Dispatch, SetStateAction } from "react";
import type { AudioBuffersState } from "../app";
import { AnimatePresence, motion } from "framer-motion";
import { transition, variants } from "../lib/animations";
import clsx from "clsx";

interface ConvolveButtonProps {
  audioBuffers: AudioBuffersState;
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
}

export default function ConvolveButton({ audioBuffers }: ConvolveButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renderedBuffer, setRenderedBuffer] = useState<AudioBuffer | null>(
    null
  );
  const [convolvedSampleWaveFile, setConvolvedSampleWaveFile] =
    useState<Blob | null>(null);

  const { firstSample, secondSample } = audioBuffers;

  const handleConvolve = async () => {
    if (firstSample && secondSample) {
      // create offline context to render audio
      console.log({ firstSample });
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
        // download(waveFile);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const isDisabled =
    audioBuffers.firstSample === null || audioBuffers.secondSample === null;

  return isError ? (
    <button
      onClick={() => setIsError(false)}
      type="submit"
      className="z-20 w-52 self-center rounded-md bg-red-800 px-3.5 py-1.5 text-sm text-neutral-100 shadow-sm transition duration-700 ease-in-out hover:bg-red-700"
    >
      Something went wrong
    </button>
  ) : (
    <>
      <motion.button
        onClick={handleConvolve}
        disabled={isDisabled}
        className={clsx(
          {
            "cursor-not-allowed": isDisabled,
            "cursor-pointer": !isDisabled,
            "cursor-auto": isProcessing,
          },
          "flex h-8 w-32 items-center justify-evenly rounded-md bg-sky-100 px-3.5 py-1.5 text-sm text-sky-800 shadow-sm transition duration-300 ease-in-out hover:bg-sky-200"
        )}
        variants={{
          hidden: { opacity: 0, transform: "translateY(10px)" },
          show: { opacity: 1, transform: "translateY(0px)" },
        }}
        initial="hidden"
        animate="show"
        transition={{ ...transition, delay: 0.48 }}
        key="start-button"
      >
        <p>
          {isProcessing ? <RingLoader size={19} color="#075985" /> : "Start"}
        </p>
      </motion.button>
      <ResultModal
        onClose={() => setShowModal(false)}
        sample={convolvedSampleWaveFile}
        buffer={renderedBuffer}
        isShowing={showModal}
      />
    </>
  );
}
