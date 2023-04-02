import { Variants } from "framer-motion";

export const pulse: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(70, 205, 207, 0.2)",
      "0 0 0 20px rgba(70, 205, 207, 0)",
    ],
    transition: {
      repeat: Infinity,
      repeatDelay: 0.2,
      ease: "easeInOut",
      duration: 1,
    },
  },
};
