import Link from "next/link";
import { Web3ToolsApp } from "types";
import classNames from "classnames";
import { css } from "@emotion/css";

interface AppCardProps {
  app: Web3ToolsApp;
}
const AppCard = ({ app }: AppCardProps) => {
  const color = app.chain.color;
  const customClassName = css`
    &:before {
      background: ${color};
      border-color: ${color};
    }
    &:hover {
      background: ${color};
    }
  `;
  const basicClassName =
    "card p-4 relative bg-transparent rounded-md border-2 text-bold text-xl first-letter:text-2xl border-black border-2 hover:bg-[${app.chain.color}] before:content-[''] before:absolute before:border-2 before:rounded-md before:border-black before:box-content before:w-full before:h-full before:left-1 before:bottom-1";
  return (
    <>
      <Link href={app.path}>
        <a className={classNames(basicClassName, customClassName)}>{app.name}</a>
      </Link>
    </>
  );
};

export default AppCard;
