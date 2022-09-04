import Link from "next/link";
import { Web3ToolsApp } from "types";
import classNames from "classnames";
import { generateCustomClassName } from "utils";

interface AppCardProps {
  app: Web3ToolsApp;
}
const AppCard = ({ app }: AppCardProps) => {
  const customClassName = generateCustomClassName(
    ["hover:bg", "before:bg", "before:border"],
    app.chain.color
  );
  const basicClassName =
    "card p-4 relative bg-transparent rounded-md text-bold text-xl border-black border-2 hover:bg-[${app.chain.color}] before:content-[''] before:absolute before:border-2 before:rounded-md before:box-content before:w-full before:h-full before:left-1 before:bottom-1";
  return (
    <>
      <Link href={app.path}>
        <a className={classNames(customClassName, basicClassName)}>
          {app.name}
        </a>
      </Link>
    </>
  );
};

export default AppCard;
