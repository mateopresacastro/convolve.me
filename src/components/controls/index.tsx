import { motion } from "framer-motion";

import TrashButton from "@/components/controls/trash";
import Upload from "@/components/controls/upload";
import PlayStop from "@/components/controls/play-stop";
import Record from "@/components/controls/record";

import type { Id } from "@/types";

interface Controls {
  label: string;
  id: Id;
}

export default function Controls({ label, id }: Controls) {
  return (
    <motion.div className="flex h-10 w-full items-center justify-center">
      <Upload id={id} label={label} />
      <Record id={id} />
      <PlayStop id={id} />
      <TrashButton id={id} />
    </motion.div>
  );
}
