import { delay, motion } from "framer-motion";
import { variants } from "../lib/animations";

const container1 = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: {
    y: "15%",
    opacity: 0,
  },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, type: "spring", bounce: 0.4 },
  },
};

export default function Title() {
  const title = "convolve.me";
  const desc = "Upload or record two samples and press start";
  return (
    <section className="flex flex-col items-start">
      <motion.h1
        className="text-lg font-medium text-neutral-700"
        variants={container1}
        initial="hidden"
        animate="show"
      >
        {title.split("").map((char, index) => (
          <motion.span
            key={char + index}
            variants={item}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="text-sm text-neutral-500"
        variants={container1}
        initial="hidden"
        animate="show"
        key="desc"
      >
        {desc.split(" ").map((word, index) => (
          <motion.span
            key={word + index}
            variants={item}
            className="mr-1 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}
