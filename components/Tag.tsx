import SvgIcon from "./icons/SvgIcon";
import classNames from "classnames";
import { css, cx } from "@emotion/css";
import * as Tooltip from "@radix-ui/react-tooltip";
import TooltipContent from "components/TooltipContent";

interface TagProps {
  name: string;
  className?: string;
  icons?: string[];
  color: string;
}
const Tag = ({ name, className = "", icons, color }: TagProps) => {
  const customClassName = css`
    color: ${color};
    &:hover {
      background: ${color};
    }
  `;
  const basicClassName =
    "transition-ease pr-4 group hover:pl-4 flex justify-between items-center w-full gap-2 hover:text-black py-2 text-xl font-bold text-center rounded-md outline-black";
  return (
    <div
      className={classNames(basicClassName, customClassName, className)}
      key={name}
      aria-label={name}
    >
      <span>{name}</span>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="transition-ease flex group-hover:scale-125 gap-2 items-center icon">
            {icons && <SvgIcon className="w-5 h-5" name={icons[0]} />}
          </span>
        </Tooltip.Trigger>
        {icons && icons.length > 1 && (
          <TooltipContent>
            <div className="grid grid-cols-3 gap-2 py-1">
              {icons.map((i) => (
                <SvgIcon className="w-5 h-5" key={i} name={i} />
              ))}
            </div>
          </TooltipContent>
        )}
      </Tooltip.Root>
    </div>
  );
};

export default Tag;
