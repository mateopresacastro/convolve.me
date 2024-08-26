import clsx from "clsx";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { Id } from "@/types";
import { audioBuffersAtom } from "@/lib/jotai";

export default function PlayStop({
  id,
  buffer,
}: {
  id: Id;
  buffer?: AudioBuffer;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBuffers = useAtomValue(audioBuffersAtom);
  const currentBuffer = buffer ? buffer : audioBuffers[id];

  const play = () => {
    if (!audioBuffers[id] || isPlaying) return;
    setIsPlaying(true);
    const ctx = new AudioContext();
    const sampleSourceNode = new AudioBufferSourceNode(ctx, {
      buffer: currentBuffer,
    });
    sourceNodeRef.current = sampleSourceNode;
    sampleSourceNode.connect(ctx.destination);
    sampleSourceNode.start();
    sampleSourceNode.onended = () => setIsPlaying(false);
  };

  const stop = () => {
    if (!sourceNodeRef.current || !isPlaying) return;
    sourceNodeRef.current.stop();
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {currentBuffer ? (
        <motion.div
          className="flex items-center justify-center"
          initial={{
            opacity: 0,
            filter: "blur(4px)",
            transform: "translateY(10px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transform: "translateY(0px)",
          }}
          exit={{
            opacity: 0,
            filter: "blur(4px)",
            transform: "translateY(10px)",
          }}
        >
          <motion.div key={`play-icon-${id}`}>
            <motion.svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              animate={{
                color: isPlaying ? "green" : "currentColor",
              }}
              className={clsx("h-6 w-6 cursor-pointer focus:outline-none")}
              onClick={play}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
            </motion.svg>
          </motion.div>
          <motion.div layoutId={`center-control-${id}`} key={`stop-icon-${id}`}>
            <motion.svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              className="h-6 w-6 cursor-pointer  text-neutral-900 focus:outline-none"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              onClick={stop}
            >
              <motion.path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"></motion.path>
            </motion.svg>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
