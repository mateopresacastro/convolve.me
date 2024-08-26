import { motion } from "framer-motion";

import Controls from "@/components/controls";
import WaveForm from "@/components/wave-form";

import type { Id } from "@/types";

export default function Input({
  label,
  id,
  i,
}: {
  label: string;
  id: Id;
  i: number;
}) {
  return (
    <motion.div
      key={id}
      className="flex h-32 w-full items-center justify-center"
      initial={{
        opacity: 0,
        transform: "translateY(10px)",
        filter: "blur(1px)",
      }}
      animate={{
        opacity: 1,
        transform: "translateY(0px)",
        filter: "blur(0px)",
      }}
    >
      <motion.div className="flex flex-col items-center justify-center">
        <WaveForm id={id} />
        <Controls label={label} id={id} />
      </motion.div>
    </motion.div>
  );
}
