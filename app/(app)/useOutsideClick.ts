import { RefObject, useCallback, useEffect } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: (clickEvent: MouseEvent) => void,
  options: {
    toggler?: RefObject<HTMLElement>;
    onTogglerClick?: (clickEvent: MouseEvent) => void;
  } = {
    onTogglerClick: () => void 0,
  }
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (options?.toggler && options?.onTogglerClick) {
          const path = (event as any)?.path as any[];

          if (path?.find((value) => value === options.toggler?.current)) {
            return options.onTogglerClick(event);
          } else {
            return callback(event);
          }
        } else {
          return callback(event);
        }
      }
    },
    [ref, callback, options]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
};
