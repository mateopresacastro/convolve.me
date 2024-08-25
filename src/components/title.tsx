import { motion } from "framer-motion";
import { variants, transition } from "../lib/animations";

export default function Title() {
  const title = "Convolution";
  const desc =
    "The process of multiplying two audio signals. The frequencies that are shared between the two will be accentuated, while the rest will be attenuated.";
  return (
    <motion.div className="flex w-full flex-col items-start md:mb-0">
      <motion.h1
        className="text-lg font-medium text-neutral-800"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={transition}
      >
        {title}
      </motion.h1>

      <motion.p
        variants={variants}
        initial="hidden"
        animate="show"
        className="text-neutral-700"
        transition={{ ...transition, delay: 0.12 }}
      >
        /ˌkɑːnvəˈluːʃn/
      </motion.p>
      <motion.p
        className="w-80 pt-2 text-sm text-neutral-600 md:w-[664px]"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={{ ...transition, delay: 0.24 }}
      >
        {desc}
      </motion.p>

      <motion.p
        className="w-80 py-6 text-sm text-neutral-600 md:w-[664px]"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={{ ...transition, delay: 0.36 }}
      >
        Record or upload your two samples and press start to convolve them:
      </motion.p>
    </motion.div>
  );
}
