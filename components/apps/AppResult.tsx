import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { Copy, Code, StretchHorizontal } from "lucide-react";
import beautify from "json-beautify-fix";
import copy from "copy-to-clipboard";
import HexValue from "../HexValue";
import * as Tooltip from "@radix-ui/react-tooltip";
import TooltipContent from "components/TooltipContent";

interface AppResultProps {
  type?: string;
  className?: string;
  jsonOnly?: boolean;
  children?: React.ReactNode;
  data?: { [key: string]: string } | string;
}

const AppResult = ({ data, jsonOnly = false }: AppResultProps) => {
  const [jsonFormat, setJsonFormat] = useState<boolean>(jsonOnly);
  const [copied, setCopied] = useState(false);
  const style = useSpring({
    from: { opacity: 0, y: -20 },
    to: {
      opacity: 1,
      y: 0
    }
  });
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copied) timer = setTimeout(() => setCopied(false), 2000);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [copied, setCopied]);

  if (!data) return null;
  const isObject = typeof data === "object";
  const _data = jsonOnly ? [] : Object.entries(data).map(([key, value]) => ({ key, value }));
  const formatData = beautify(data, null, 2, 40);

  return (
    <div className="relative p-4 pt-10 border-2 w-full border-black rounded-md">
      {typeof data === "string" ? (
        <span className="text-xl font-mono break-all">
          <HexValue value={data}></HexValue>
        </span>
      ) : jsonFormat ? (
        <div className="whitespace-pre text-xl font-mono">{formatData}</div>
      ) : (
        <ul className="font-mono text-xl">
          {isObject
            ? _data.map((d) => (
                <animated.li
                  key={d.key}
                  style={style}
                  className="grid grid-cols-[minmax(8rem,16rem)_1fr] gap-4 my-2"
                >
                  <span className="font-bold">{d.key}</span>
                  <span className="break-all">
                    <HexValue value={d.value}></HexValue>
                  </span>
                </animated.li>
              ))
            : data}
        </ul>
      )}
      <div className="absolute right-2 top-2 flex gap-2">
        {!jsonOnly && (
          <button
            className="bg-pink-300 w-8 h-8 px-2 py-1 rounded-lg hover:bg-pink-500 transition-all ease-in-out delay-150"
            onClick={(e) => {
              e.preventDefault();
              setJsonFormat(!jsonFormat);
            }}
          >
            {jsonFormat ? <StretchHorizontal size={16} /> : <Code size={16} />}
          </button>
        )}
        <Tooltip.Root delayDuration={200} open={copied}>
          <Tooltip.Trigger asChild>
            <button
              className="bg-pink-300 px-2 py-1 rounded-lg hover:bg-pink-500 transition-all ease-in-out delay-150"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copy(formatData);
                setCopied(true);
              }}
            >
              <Copy size={16}></Copy>
            </button>
          </Tooltip.Trigger>
          <TooltipContent>
            <span>{copied ? "copied" : "copy"} </span>
          </TooltipContent>
        </Tooltip.Root>
      </div>
    </div>
  );
};
export default AppResult;
