import SvgIcon from "./icons/SvgIcon";
import classNames from "classnames";
import { generateCustomClassName } from "utils";

interface TagProps {
  name: string;
  className?: string;
  icons?: string[];
  color: string;
  withEllipsis?: boolean;
}
const Tag = ({
  name,
  className = "",
  icons,
  color,
  withEllipsis = false,
}: TagProps) => {
  const customClassName = generateCustomClassName(
    ["hover:bg", "border", "text"],
    color
  );
  const basicClassName =
    "transition-ease px-4 flex justify-between items-center  gap-2 hover:text-black hover:border-black w-auto py-2 text-xl font-bold text-center border-4 rounded-md";
  return (
    <button className={classNames(customClassName, basicClassName, className)}>
      <span>{name}</span>
      <span className="flex gap-2 items-center">
        {icons &&
          icons.map((i) => <SvgIcon className="w-5 h-5" key={i} name={i} />)}
        {withEllipsis && "..."}
      </span>
    </button>
  );
};

export default Tag;
