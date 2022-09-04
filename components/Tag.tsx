import { IncomingMessage } from "http";
import SvgIcon from "./icons/SvgIcon";

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
  return (
    <button
      className={`transition-ease px-4 flex justify-between items-center  gap-2 hover:text-black hover:border-black hover:bg-${color} w-auto py-2 text-xl font-bold text-center border-4 border-${color} rounded-md text-${color} ${className}`}
    >
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
