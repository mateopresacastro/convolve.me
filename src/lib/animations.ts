export const variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      type: "spring",
      delay: 1.5,
      bounce: 0.4,
    },
  },
};
