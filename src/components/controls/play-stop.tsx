import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { audioAtom, audioContextAtom, sourceNodeAtom } from "@/lib/atoms";

import type { Id } from "@/types";

export default function PlayStop({ id }: { id: Id }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceNode, setSourceNode] = useAtom(sourceNodeAtom);
  const [audioContext, setAudioContext] = useAtom(audioContextAtom);
  const audioBuffers = useAtomValue(audioAtom);
  const buffer = audioBuffers[id];

  const play = () => {
    if (!buffer || buffer instanceof Blob || isPlaying) return;
    sourceNode?.disconnect();
    setSourceNode(null);
    setIsPlaying(true);

    const ctx = audioContext ?? new AudioContext();
    if (!audioContext) setAudioContext(ctx);

    const sampleSourceNode = new AudioBufferSourceNode(ctx, {
      buffer,
    });
    sampleSourceNode.connect(ctx.destination);
    sampleSourceNode.start();
    setSourceNode(sampleSourceNode);
    sampleSourceNode.onended = () => {
      setIsPlaying(false);
      setSourceNode(null);
    };
  };

  const stop = () => {
    if (!sourceNode || !isPlaying) return;
    sourceNode?.stop();
    setSourceNode(null);
  };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {buffer ? (
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
          <AnimatePresence mode="popLayout" initial={false}>
            {!isPlaying ? (
              <motion.div
                key={`play-icon-${id}`}
                layoutId={`center-control-${id}`}
                initial={{ opacity: 0, filter: "blur(1px)", scale: 0.8 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(1px)", scale: 0.8 }}
              >
                <motion.svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1 }}
                  className={clsx("h-6 w-6 cursor-pointer focus:outline-none")}
                  onClick={play}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                </motion.svg>
              </motion.div>
            ) : (
              <motion.div
                key={`stop-icon-${id}`}
                layoutId={`center-control-${id}`}
                initial={{ opacity: 0, filter: "blur(4px)", scale: 0.6 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)", scale: 0.6 }}
              >
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
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
