import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import classnames from "classnames";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  label?: string;
  selected: string;
  options: Option[];
  selectClassName?: string;
  onChange: (value: string) => void;
};

export const fadeInOut: Variants = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const Dropdown = ({
  label = "",
  selected,
  options,
  selectClassName,
  onChange,
}: DropdownProps) => {
  const [shown, setShown] = useState(false);

  const showSelectedLabel = () => {
    const [option] = options.filter((opt) => opt.value === selected);

    return option.label;
  };

  const handleChange = (option: Option) => () => {
    onChange(option.value);

    setShown(false);
  };

  const handleOver = (value: boolean) => () => {
    setShown(value);
  };

  const selectClasses = twMerge(
    `w-[100%] h-[40px] px-2 text-sm border border-teal-200 rounded-md relative ${selectClassName}`
  );

  return (
    <div className="relative w-[100%]">
      <div className={`flex ${label ? "gap-2" : ""} `}>
        {label && <label>{label}</label>}
        <motion.div
          whileTap={{ scale: 0.95 }}
          role="button"
          className={`${selectClasses} flex ${
            label ? "gap-2" : ""
          } cursor-pointer flex gap-2 items-center justify-between`}
          onClick={handleOver(!shown)}
        >
          <span className="flex-1">{showSelectedLabel()}</span>
          {!shown && <IconChevronDown />}
          {shown && <IconChevronUp />}
        </motion.div>
      </div>
      <motion.ul
        variants={fadeInOut}
        animate={shown ? "enter" : "exit"}
        initial="exit"
        className="absolute w-[100%] bg-grayBlack mt-1 border-opacity-50 z-20 rounded-md shadow-lg shadow-grayBlack bg-white"
      >
        {options.map((option) => {
          const isSelected = option.value === selected;
          return (
            <motion.button
              key={option.value}
              onClick={handleChange(option)}
              className={twMerge(
                `block w-[100%] p-2 max-w-[100%] hover:bg-teal-50 text-sm`,
                classnames({ "bg-teal-50": isSelected })
              )}
            >
              <motion.li>
                <div className="flex flex-1 justify-between items-center">
                  {option.label}
                  {isSelected && <IconCheck />}
                </div>
              </motion.li>
            </motion.button>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default Dropdown;
