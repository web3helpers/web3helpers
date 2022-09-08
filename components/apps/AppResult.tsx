import { animated, useSpring } from "@react-spring/web";

interface AppResultProps {
  type?: string;
  className?: string;
  data: { [key: string]: string };
}

const AppResult = ({ data, className }: AppResultProps) => {
  const style = useSpring({
    from: { opacity: 0, y: -20 },
    to: {
      opacity: 1,
      y: 0,
    },
  });
  if (!data) return null;
  const _data = Object.entries(data).map(([key, value]) => ({ key, value }));
  return (
    <>
      <ul className="p-4 border-2 border-black rounded-md">
        {_data.map((d) => (
          <animated.li
            key={d.key}
            style={style}
            className="grid grid-cols-[8rem_1fr] gap-4 my-2"
          >
            <span className="text-2xl font-bold">{d.key}</span>
            <span className="text-xl break-all">{d.value}</span>
          </animated.li>
        ))}
      </ul>
    </>
  );
};
export default AppResult;
