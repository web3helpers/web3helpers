import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import beautify from "json-beautify-fix";
import copy from "copy-to-clipboard";
import HexValue from "../HexValue";

interface AppResultProps {
  type?: string;
  className?: string;
  data?: { [key: string]: string } | string;
}

const AppResult = ({ data }: AppResultProps) => {
  const [jsonFormat, setJsonFormat] = useState<boolean>(false);
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

  const _data = Object.entries(data).map(([key, value]) => ({ key, value }));
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
        <ul>
          {_data.map((d) => (
            <animated.li
              key={d.key}
              style={style}
              className="grid grid-cols-[minmax(8rem,16rem)_1fr] gap-4 my-2"
            >
              <span className="text-xl font-mono font-bold">{d.key}</span>
              <span className="text-xl font-mono break-all">
                <HexValue value={d.value}></HexValue>
              </span>
            </animated.li>
          ))}
        </ul>
      )}
      <div className="absolute right-2 top-2 flex gap-2">
        <button
          className="bg-gray-400 px-2 py-1 rounded-lg hover:bg-gray-500"
          onClick={(e) => {
            e.preventDefault();
            setJsonFormat(!jsonFormat);
          }}
        >
          {jsonFormat ? "normal" : "json"}
        </button>
        <button
          className="bg-gray-400 px-2 py-1 rounded-lg hover:bg-gray-500 transition-all ease-in-out delay-150"
          onClick={(e) => {
            e.preventDefault();
            copy(formatData);
            setCopied(true);
          }}
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>
    </div>
  );
};
export default AppResult;
