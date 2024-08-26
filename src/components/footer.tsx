import Link from "next/link";
import { motion } from "framer-motion";
import { RxGithubLogo } from "react-icons/rx";

export default function Footer() {
  return (
    <motion.footer
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
      key="github-link-a"
      className="absolute bottom-0 flex w-full flex-col items-center justify-center py-6"
    >
      <Link
        href="https://github.com/MateoPresaCastro/convolve.me"
        aria-label="Github"
      >
        <RxGithubLogo className="h-4 w-4 cursor-pointer text-neutral-400 transition duration-300 ease-in-out hover:text-neutral-700" />
      </Link>
    </motion.footer>
  );
}
