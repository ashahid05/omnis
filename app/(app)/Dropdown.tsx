import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, TargetAndTransition } from "framer-motion";
import {
  MouseEventHandler,
  forwardRef,
  ReactNode,
  HTMLAttributes,
} from "react";
import Utils from "../utils";

const variants: Record<string, TargetAndTransition> = {
  open: {
    opacity: 1,
    y: "0px",
  },
  closed: {
    opacity: 0,
    y: "50px",
  },
};

export const DropdownMenu: React.FC<{
  isOpen: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  children: ReactNode;
}> = ({ children, isOpen, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={Utils.concat(
            "absolute flex flex-co mt-2 bg-white rounded-lg shadow-2xl overflow-hidden z-50",
            className
          )}
          animate="open"
          initial="closed"
          variants={variants}
          transition={{ type: "tween", duration: 0.2 }}
          exit="closed"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// eslint-disable-next-line react/display-name
export const DropdownMenuWithRef = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    isOpen: boolean;
    className?: HTMLAttributes<HTMLDivElement>["className"];
  }
>(({ children, isOpen, className }, ref) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={Utils.concat(
            "absolute flex flex-col mt-2 bg-cool-gray-800 rounded-lg shadow-2xl overflow-hidden z-50",
            className
          )}
          animate="open"
          initial="closed"
          variants={variants}
          transition={{ type: "tween", duration: 0.2 }}
          exit="closed"
          {...{ ref }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export const DropdownItem: React.FC<{
  onClick?: MouseEventHandler<HTMLSpanElement>;
  icon?: FontAwesomeIconProps["icon"];
  className?: HTMLAttributes<HTMLSpanElement>["className"];
  children: ReactNode;
}> = ({ children, onClick, icon, className }) => {
  return (
    <div
      className={Utils.concat(
        `relative flex items-center px-4 py-2 cursor-pointer text-gray-300 hover:text-gray-400 transition duration-200 ease-in-out`,
        className
      )}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-3" />}
      {children}
    </div>
  );
};
