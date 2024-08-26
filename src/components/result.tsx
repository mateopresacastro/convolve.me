import { motion } from "framer-motion";

import { Input } from "@/components/inputs";

export default function Result() {
  const id = "result";
  const label = "Result";
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center md:flex-row md:gap-0 gap-6 py-6 md:py-0 h-[329px] md:h-[128px]"
      initial={{ opacity: 0, filter: "blur(1px)" }}
      exit={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      key="main-inputs"
    >
      <Input key={id} label={label} id={id} />
    </motion.div>
  );
}
