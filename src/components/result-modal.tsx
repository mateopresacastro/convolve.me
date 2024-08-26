import download from "../lib/download";
import WaveForm from "./wave-form";
import { BsDownload, BsArrowLeft } from "react-icons/bs";
import PlayStop from "./player/controls/play-stop";
import { AnimatePresence, motion } from "framer-motion";

export default function ResultModal({
  onClose,
  sample,
  buffer,
  isShowing,
}: {
  onClose: () => void;
  sample: Blob | null;
  buffer: AudioBuffer | null;
  isShowing: boolean;
}) {
  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div>
          <div className="absolute inset-0 z-30 h-full w-full bg-neutral-900 opacity-50"></div>
          <div className="absolute inset-0 z-40 flex h-full w-full items-center justify-center">
            <div className="xl:w-1/16 md:w-1/2 lg:w-1/2 absolute flex h-72 w-96 max-w-[50rem] flex-col items-center justify-evenly rounded-lg bg-neutral-50 shadow-2xl">
              <div className="flex flex-col items-center justify-center">
                <h3 className="mb-2 text-xl font-bold text-neutral-500">
                  Result
                </h3>
                <div className="flex">
                  <PlayStop
                    audioBuffers={{
                      firstSample: buffer,
                      secondSample: null,
                    }}
                    id="firstSample"
                  />
                </div>
              </div>
              <div className="z-40 text-neutral-500">
                <WaveForm sample={sample} id="result" />
              </div>
              <div className="flex w-96 justify-evenly">
                <button
                  onClick={onClose}
                  className="flex w-36 cursor-pointer items-center justify-evenly rounded-md px-3.5 py-1.5 text-sm text-neutral-700 underline-offset-4 hover:underline"
                >
                  <BsArrowLeft />
                  Go Back
                </button>
                <motion.button
                  onClick={() => sample && download(sample)}
                  className="flex w-36 cursor-pointer items-center justify-evenly rounded-md bg-sky-100 px-3.5 py-1.5 text-sm text-sky-800 shadow-sm transition  duration-300 ease-in-out hover:bg-sky-200"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <BsDownload />
                  Download
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
