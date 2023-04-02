import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type BackdropProps = {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

const Backdrop = ({ children, className = "", onClick }: BackdropProps) => {
  const classes = twMerge(`fixed top-0 left-0 w-full h-full z-50 ${className}`);

  return (
    <motion.div
      onClick={onClick}
      className={classes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
