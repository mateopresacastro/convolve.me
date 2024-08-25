import { motion } from "framer-motion";
import { variants, transition } from "../lib/animations";

export default function Title() {
  const title = "convolve.me";
  const desc = "Record or upload two samples and press start.";
  return (
    <motion.div className="flex flex-col items-start md:mb-0" layout>
      <motion.h1
        className="text-lg font-medium uppercase text-neutral-700"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={transition}
      >
        {title}
      </motion.h1>
      <motion.p
        className="relative w-full text-neutral-500"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={{ ...transition, delay: 0.12 }}
      >
        {desc}
      </motion.p>
    </motion.div>
  );
}
