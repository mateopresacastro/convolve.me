export const variants = {
  hidden: { opacity: 0, transform: "translateY(10px)", filter: "blur(1px)" },
  show: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
};

export const transition = {
  duration: 0.65,
  type: "spring",
  bounce: 0.3,
  filter: { transition: { bounce: 0 } },
};
