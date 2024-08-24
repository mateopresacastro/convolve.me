import { motion } from "framer-motion";
import { variants, transition } from "../lib/animations";

export default function Title() {
  const title = "convolve.me";
  const desc = "Record or upload two samples and press start.";
  return (
    <section className="flex flex-col items-start">
      <motion.h1
        className="text-lg font-medium text-neutral-700"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={transition}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-sm text-neutral-500"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={{ ...transition, delay: 0.12 }}
      >
        {desc}
      </motion.p>
    </section>
  );
}
