import clsx from "clsx";
import { motion } from "framer-motion";
import { Inter, Newsreader } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const newsreader = Newsreader({ subsets: ["latin"] });

const initial = {
  opacity: 0,
  transform: "translateY(10px)",
  filter: "blur(1px)",
};

const animate = {
  opacity: 1,
  transform: "translateY(0px)",
  filter: "blur(0px)",
};

export default function Title() {
  return (
    <motion.div
      className={clsx(
        newsreader.className,
        "flex w-full flex-col items-start md:mb-0"
      )}
    >
      <motion.h1
        className="text-lg font-medium text-neutral-800"
        initial={initial}
        animate={animate}
      >
        Convolution
      </motion.h1>

      <motion.p
        initial={initial}
        animate={animate}
        className={clsx(inter.className, "text-neutral-400 text-xs")}
      >
        /ˌkɑːn.vəˈluː.ʃən/
      </motion.p>
      <motion.p
        className="w-80 pt-2 text-neutral-700 md:w-[664px]"
        initial={initial}
        animate={animate}
      >
        The process of multiplying two audio signals. The frequencies that are
        shared between the two will be accentuated, while the rest will be
        attenuated.
      </motion.p>

      <motion.p
        className="w-80 py-6 text-neutral-700 md:w-[664px]"
        initial={initial}
        animate={animate}
      >
        Record or upload two audio files and press convolve:
      </motion.p>
    </motion.div>
  );
}
