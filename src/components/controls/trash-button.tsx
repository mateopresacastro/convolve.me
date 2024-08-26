import { AnimatePresence, motion } from "framer-motion";

import { audioBuffersAtom } from "@/lib/jotai";
import { useAtom } from "jotai";

import type { Id } from "@/types";

export default function TrashButton({ id }: { id: Id }) {
  const [audioBuffers, setAudioBuffers] = useAtom(audioBuffersAtom);

  const deleteAudioBuffer = () => {
    if (!audioBuffers[id]) return;
    setAudioBuffers((prev) => ({
      ...prev,
      [id]: null,
    }));
  };
  return (
    <AnimatePresence mode="wait" initial={false}>
      {audioBuffers[id] ? (
        <motion.div layoutId={`trash-icon-${id}`}>
          <motion.svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            whileHover={{
              scale: 1.2,
              color: audioBuffers[id] ? "#dc2626" : "#a3a3a3",
            }}
            whileTap={{ scale: 1 }}
            initial={{ opacity: 0 }}
            animate={{
              color: "#a3a3a3",
              opacity: 1,
            }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            className="ml-1 h-[1.1rem] w-[1.1rem] cursor-pointer text-neutral-400 focus:outline-none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={deleteAudioBuffer}
          >
            <motion.path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></motion.path>
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
