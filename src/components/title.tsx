import { Newsreader } from "next/font/google";
import { motion } from "framer-motion";
import clsx from "clsx";

const newsreader = Newsreader({ subsets: ["latin"] });

export default function Title() {
  const title = "Convolution";
  const desc =
    "The process of multiplying two audio signals. The frequencies that are shared between the two will be accentuated, while the rest will be attenuated.";
  return (
    <motion.div className="flex w-full flex-col items-start md:mb-0">
      <motion.h1
        className="text-lg font-medium text-neutral-800"
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
        {title}
      </motion.h1>

      <motion.p
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
        className={clsx(newsreader.className, "text-neutral-700")}
      >
        /ˌkɑːn.vəˈluː.ʃən/
      </motion.p>
      <motion.p
        className="w-80 pt-2 text-sm text-neutral-600 md:w-[664px]"
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
        {desc}
      </motion.p>

      <motion.p
        className="w-80 py-6 text-sm text-neutral-600 md:w-[664px]"
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
        Record or upload two audio files and press start to convolve them:
      </motion.p>
    </motion.div>
  );
}
