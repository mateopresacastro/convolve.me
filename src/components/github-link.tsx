import { motion } from "framer-motion";
import { transition, variants } from "../lib/animations";
import { RxGithubLogo } from "react-icons/rx";

export default function GitHubLink() {
  return (
    <footer className="absolute bottom-0 flex w-full flex-col items-center justify-center">
      <motion.a
        href="https://github.com/MateoPresaCastro/convolve.me"
        aria-label="Github"
        variants={variants}
        initial="hidden"
        animate="show"
        transition={{ ...transition, delay: 0.48 }}
        key="github-link-a"
      >
        <RxGithubLogo className="h-4 w-4 cursor-pointer text-neutral-400 transition duration-300 ease-in-out hover:text-neutral-700" />
      </motion.a>
      {/* <motion.p
        className="text-xs text-neutral-50"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ ...transition, delay: 0.84 }}
        // key="github-link-p"
      >
        By Mateo Presa
      </motion.p>
      <div></div> */}
    </footer>
  );
}
