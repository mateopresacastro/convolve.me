import clsx from "clsx";
import { useRef, useState } from "react";
import { AudioBuffersState } from "../../../app";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { audioCtxAtom } from "../../../lib/jotai";

interface PlayStopProps {
  audioBuffers: AudioBuffersState;
  id: "firstSample" | "secondSample";
}

export default function PlayStop({ audioBuffers, id }: PlayStopProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctx = useAtomValue(audioCtxAtom);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const playSample = () => {
    if (!audioBuffers[id] || isPlaying) return;
    setIsPlaying(true);
    const sampleSourceNode = new AudioBufferSourceNode(ctx, {
      buffer: audioBuffers[id],
    });
    sourceNodeRef.current = sampleSourceNode;
    sampleSourceNode.connect(ctx.destination);
    sampleSourceNode.start();
    sampleSourceNode.onended = () => setIsPlaying(false);
  };

  const stopSample = () => {
    if (!sourceNodeRef.current || !isPlaying) return;
    sourceNodeRef.current.stop();
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      exit={{ opacity: 0, filter: "blur(2px)" }}
      initial={{ opacity: 0, filter: "blur(2px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
    >
      <motion.div layoutId={`play-icon-${id}`}>
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
          className={clsx("mr-2 h-6 w-6 cursor-pointer focus:outline-none")}
          onClick={playSample}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
        </motion.svg>
      </motion.div>
      <motion.div layoutId={`stop-icon-${id}`}>
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
          onClick={stopSample}
        >
          <motion.path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"></motion.path>
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
