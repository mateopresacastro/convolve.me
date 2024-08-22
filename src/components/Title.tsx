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
    <section className="my-10 flex flex-col items-center justify-center">
      <motion.h1
        className="mb-2 text-7xl font-medium text-zinc-700"
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
        className="text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, type: "easeOut", delay: 0.7 }}
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
