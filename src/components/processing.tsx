import { motion, useTime, useTransform } from "framer-motion";
import { forwardRef } from "react";

const Processing = forwardRef(function Processing() {
  const time = useTime();
  const rotate1 = useTransform(time, [0, 1500], [0, 360], { clamp: false });
  const rotate4 = useTransform(time, [0, 1200], [0, 360], { clamp: false });

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(1px)" }}
      className="flex md:h-[128px] h-[328px] w-full items-center justify-center text-sm relative"
    >
      <motion.div
        className="size-7 bg-neutral-800 rounded-lg absolute"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="size-7 bg-neutral-800 rounded-lg absolute"
        style={{ rotate: rotate4 }}
      />
      <motion.p
        className="pt-20 text-sm"
        initial={{
          opacity: 0,
          filter: "blur(1px)",
          transform: "translateY(10px)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px)",
        }}
        exit={{
          opacity: 0,
          filter: "blur(1px)",
          transform: "translateY(10px)",
        }}
      >
        Processing
      </motion.p>
    </motion.div>
  );
});

export default Processing;
