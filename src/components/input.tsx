import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { transition, variants } from "@/lib/animations";

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
      className={clsx("flex h-28 w-full items-center justify-center")}
      variants={variants}
      initial="hidden"
      animate="show"
      transition={{ ...transition, delay: 0.48 + i * 0.12 }}
    >
      <div className="flex flex-col items-center justify-center">
        <LayoutGroup>
          <WaveForm id={id} />
          <Controls label={label} id={id} />
        </LayoutGroup>
      </div>
    </motion.div>
  );
}
