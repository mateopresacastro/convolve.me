import { AnimatePresence, motion } from "framer-motion";

import { audioAtom, sourceNodeAtom } from "@/lib/atoms";
import { useAtom, useSetAtom } from "jotai";

import type { Id } from "@/types";

export default function TrashButton({ id }: { id: Id }) {
  const [audioBuffers, setAudioBuffers] = useAtom(audioAtom);
  const [sourceNode, setSourceNode] = useAtom(sourceNodeAtom);
  const buffer = audioBuffers[id];

  const deleteBuffer = () => {
    if (!buffer) return;
    setAudioBuffers((prev) => ({
      ...prev,
      [id]: null,
    }));

    if (!sourceNode) return;
    sourceNode.disconnect();
    setSourceNode(null);
  };

  return (
    <AnimatePresence mode="popLayout">
      {buffer ? (
        <motion.div
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
          <motion.svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            whileHover={{
              scale: 1.2,
              color: "#dc2626",
            }}
            whileTap={{ scale: 1 }}
            animate={{ color: "#a3a3a3" }}
            className="ml-1 h-[1.1rem] w-[1.1rem] cursor-pointer text-neutral-400 focus:outline-none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={deleteBuffer}
          >
            <motion.path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></motion.path>
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
