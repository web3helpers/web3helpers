import { css } from "@emotion/css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import classNames from "classnames";
import Tag from "components/Tag";
import { Chain } from "types";
import { chains, generateCustomClassName } from "utils/";

interface TagListProps {
  onChange(chain: string): void;
}
const TagList = ({ onChange }: TagListProps) => {
  return (
    <>
      <ToggleGroup.Root
        type="single"
        defaultValue="evm"
        aria-label="Chain"
        onValueChange={(chain) => onChange(chain)}
        className="flex flex-col gap-4 w-full"
      >
        {chains.map((c) => {
          const customClassName = css`
            &:hover {
              background: ${c.color};
            }
            &[data-state="on"] {
              background: ${c.color};
              div {
                color: #000;
                border-radius: 0.375rem;
                border: 4px solid #000;
              }
            }
          `;
          const basicClassName = "rounded-md";
          return (
            <ToggleGroup.Item
              className={classNames(basicClassName, customClassName)}
              value={c.name}
              key={c.name}
              aria-label={c.name}
            >
              <Tag
                name={c.name}
                icons={c.icons}
                color={c.color}
                key={c.name}
                withEllipsis={c.name === "Evm"}
                className="w-full"
              ></Tag>
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </>
  );
};

export default TagList;
