import { AnimatePresence, motion } from "framer-motion";
import { audioBuffersAtom } from "@/lib/jotai";
import { useAtomValue } from "jotai";

import Record from "@/components/player/controls/record";
import PlayStop from "@/components/player/controls/play-stop";

import type { Id } from "@/types";

export default function Player({ id }: { id: Id }) {
  const audioBuffers = useAtomValue(audioBuffersAtom);
  return (
    <motion.div className="mx-6 flex gap-2">
      <AnimatePresence mode="popLayout">
        {audioBuffers[id] ? <PlayStop id={id} /> : null}
      </AnimatePresence>
      <Record id={id} />
    </motion.div>
  );
}
