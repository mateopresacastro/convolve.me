import type { AudioBuffersState } from "../app";
import { motion } from "framer-motion";

interface TrashButtonProps {
  deleteAudioBuffer: () => void;
  id: "firstSample" | "secondSample";
  audioBuffers: AudioBuffersState;
}
export default function TrashButton({
  deleteAudioBuffer,
  id,
  audioBuffers,
}: TrashButtonProps) {
  return (
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
        transition={{ duration: 1, type: "spring" }}
        className="mr-3 h-[1.1rem] w-[1.1rem] cursor-pointer text-neutral-400 focus:outline-none"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        onClick={deleteAudioBuffer}
      >
        <motion.path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></motion.path>
      </motion.svg>
    </motion.div>
  );
}
