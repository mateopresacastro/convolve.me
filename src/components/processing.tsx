import { motion, useTime, useTransform } from "framer-motion";
import { forwardRef } from "react";

const Processing = forwardRef(function Processing() {
  const time = useTime();
  const rotate1 = useTransform(time, [0, 1000], [0, 360], { clamp: false });
  const rotate2 = useTransform(time, [0, 700], [0, 360], { clamp: false });

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(1px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(1px)" }}
      className="relative flex h-[328px] w-full items-center justify-center text-sm md:h-[128px]"
    >
      <motion.div
        className="absolute size-3 rounded-sm bg-neutral-800"
        style={{ rotate: rotate1 }}
      />
      <motion.div
        className="absolute size-3 rounded-sm bg-neutral-800"
        style={{ rotate: rotate2 }}
      />
      <motion.p
        className="pt-20 text-xs text-neutral-700"
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
