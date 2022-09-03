import { forwardRef, RefObject } from "react";
import classNames from "classnames";
import Link from "next/link";

type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps {
  size?: ButtonSize;
  children: React.ReactNode;
  className: string;
  href?: string;
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  ref?: RefObject<any> | ((instance: any) => void) | null | undefined;
}

const Button = forwardRef(function Button(
  { size = "md", children, className, onClick, href }: ButtonProps,
  buttonRef
) {
  let sizeClassName: string = "";
  switch (size) {
    case "lg":
      sizeClassName = "p-4 text-2xl";
      break;
    case "md":
      sizeClassName = "p-3 text-xl";
      break;
    case "sm":
      sizeClassName = "p-2 text-sm";
      break;
  }
  const basicClassName =
    "ransition-ease bg-solana hover:text-black hover:border-black w-auto font-bold text-center border-4 border-solana rounded-md active:outline ative:outline-2 active:outline-offset-2";
  const props = {
    onClick,
    ref: buttonRef as React.RefObject<any>,
  };
  if (href)
    return (
      <Link href={href}>
        <a
          {...props}
          className={classNames(className, basicClassName, sizeClassName)}
        >
          {children}
        </a>
      </Link>
    );
  return (
    <button
      {...props}
      className={classNames(className, basicClassName, sizeClassName)}
    >
      {children}
    </button>
  );
});

export default Button;
