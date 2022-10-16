import { css } from "@emotion/css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import classNames from "classnames";
import Tag from "components/Tag";
import { useRouter } from "next/router";
import { chains } from "utils/";

interface ChainListProps {}
const ChainList = () => {
  const router = useRouter();
  function changeChain(value: string | undefined) {
    router.push({ query: { chain: value } });
  }
  return (
    <>
      <ToggleGroup.Root
        type="single"
        aria-label="Chain"
        value={router.query.chain as string | undefined}
        onValueChange={(chain) => changeChain(chain)}
        className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full"
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
                padding-left: 1rem;
                .icon {
                  transform: scale(1.15);
                }
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
                className="w-full"
              ></Tag>
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </>
  );
};

export default ChainList;
