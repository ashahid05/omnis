import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import Utils from "@app/utils";
import Spinner from "./Spinner";

const sizeClassnames = {
  big: "py-2 px-4 text-base rounded-lg",
  small: "px-2 py-1 text-base rounded-md",
  tiny: "px-1 text-base rounded-5",
};

const colorClassnames = {
  primary:
    "text-white bg-primary-650 hover:bg-primary-750 disabled:text-gray-400 disabled:bg-primary-850 focus:ring-primary-400",
  secondary:
    "text-white bg-gray-500 hover:bg-gray-600 disabled:text-gray-300 focus:ring-gray-200",
  "secondary-800":
    "text-button bg-gray-800 hover:bg-gray-600 disabled:text-gray-300",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  loading?: boolean;
  icon?: FontAwesomeIconProps["icon"];
  transition?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  size = "big",
  color = "primary",
  disabled,
  loading,
  icon,
  className = "",
  transition = true,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={Utils.concat(
        `flex items-center justify-center`,
        sizeClassnames[size],
        transition && `transition duration-200 ease-in-out`,
        colorClassnames[color],
        `font-semibold focus:ring-4`,
        className
      )}
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? (
          <span className={`mr-2 items-center`}>
            {<FontAwesomeIcon icon={icon} />}
          </span>
        ) : null}
        {children}
      </span>
      {loading ? (
        <span className={`absolute`}>
          <Spinner size={size === "small" ? "2" : "4"} />
        </span>
      ) : null}
    </button>
  );
};

export default Button;
