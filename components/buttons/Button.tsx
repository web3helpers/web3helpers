import { forwardRef, RefObject } from "react";
import classNames from "classnames";
import Link from "next/link";
import LoadingIcon from "components/icons/LoadingIcon";

type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps {
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  ref?: RefObject<any> | ((instance: any) => void) | null | undefined;
}

const Button = forwardRef(function Button(
  {
    size = "md",
    children,
    type,
    disabled,
    className,
    onClick,
    href,
    loading = false,
  }: ButtonProps,
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
    "relative ransition-ease hover:text-black hover:border-black w-auto font-bold text-center border-4 rounded-md active:border-transparent active:outline ative:outline-2 active:outline-offset-2";
  const props = {
    onClick,
    type,
    disabled,
    ref: buttonRef as React.RefObject<any>,
  };
  if (href)
    return (
      <Link href={href}>
        <a
          {...props}
          className={classNames(basicClassName, sizeClassName, className)}
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
      <div className={loading ? "invisible" : "visible"}>{children}</div>
      {loading && <LoadingIcon className="absolute inset-0 w-6 h-6 m-auto"/>}
    </button>
  );
});

export default Button;
