import { motion } from "framer-motion";
import { forwardRef } from "react";

import Controls from "@/components/controls";
import WaveForm from "@/components/wave-form";

import type { Id, TFileInput } from "@/types";

const inputs: Array<TFileInput> = [
  {
    label: "Sample one",
    id: "firstSample",
  },
  {
    label: "Sample two",
    id: "secondSample",
  },
];

export function Input({ label, id }: { label: string; id: Id }) {
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

const Inputs = forwardRef(function Inputs() {
  return (
    <motion.div
      className="flex w-full flex-col items-center md:flex-row md:gap-0 gap-6 py-6 md:py-0"
      initial={{ opacity: 0, filter: "blur(1px)" }}
      exit={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      key="main-inputs"
    >
      {inputs.map(({ id, label }, i) => (
        <Input key={id} label={label} id={id} />
      ))}
    </motion.div>
  );
});

export default Inputs;
