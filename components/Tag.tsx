import SvgIcon from "./icons/SvgIcon";
import classNames from "classnames";
import { css, cx } from "@emotion/css";

interface TagProps {
  name: string;
  className?: string;
  icons?: string[];
  color: string;
  withEllipsis?: boolean;
}
const Tag = ({ name, className = "", icons, color, withEllipsis = false }: TagProps) => {
  const customClassName = css`
    color: ${color};
    &:hover {
      background: ${color};
    }
  `;
  const basicClassName =
    "transition-ease px-4 flex justify-between items-center w-full gap-2 hover:text-black py-2 text-xl font-bold text-center rounded-md outline-black";
  return (
    <div
      className={classNames(basicClassName, customClassName, className)}
      key={name}
      aria-label={name}
    >
      <span>{name}</span>
      <span className="flex gap-2 items-center">
        {icons && <SvgIcon className="w-5 h-5" name={icons[0]} />}
      </span>
    </div>
  );
};

export default Tag;
