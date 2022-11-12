import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import Utils from "../utils";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type FormInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon: FontAwesomeIconProps["icon"];
  label: string;
  error: string | undefined;
};

const FormInput: React.FC<FormInputProps> = ({
  error,
  icon,
  label,
  disabled,
  ...props
}) => {
  return (
    <>
      <label
        htmlFor={props.id}
        className={Utils.concat(
          "font-semibold text-sm px-1",
          error && "text-red-500"
        )}
      >
        {label}
      </label>
      <div className="relative bg-cool-gray-800 rounded-lg">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <FontAwesomeIcon
            aria-disabled={disabled}
            icon={icon}
            className={Utils.concat(
              "w-5 h-5 aria-disabled:text-gray-500",
              error ? "text-red-400" : "text-gray-400"
            )}
            fill="currentColor"
          />
        </div>
        <input
          {...props}
          name={props.id}
          disabled={disabled}
          className={Utils.concat(
            "border text-sm rounded-lg block w-full pl-10 p-2.5 bg-cool-gray-800 placeholder-gray-400 text-white outline-none",
            "disabled:cursor-not-allowed disabled:bg-cool-gray-900 disabled:border-gray-700 disabled:text-gray-400",
            error
              ? "border-red-400"
              : "border-gray-600 focus:ring-primary-500 focus:border-primary-500"
          )}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">
          <span className="font-medium">Oops! </span>
          {error}
        </p>
      )}
    </>
  );
};
export default FormInput;
