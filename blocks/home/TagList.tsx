import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Tag from "components/Tag";
import { chains, generateCustomClassName } from "utils/";

const TagList = () => {
  return (
    <>
      <ToggleGroup.Root
        type="single"
        defaultValue="evm"
        aria-label="Chain"
        className="flex flex-col gap-4 w-full"
      >
        {chains.map((c) => {
          const customClassName = generateCustomClassName(
            ["hover:bg", "active:bg"],
            c.color
          );
          return (
            <ToggleGroup.Item
              className={customClassName}
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
