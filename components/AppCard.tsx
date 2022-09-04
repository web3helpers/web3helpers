import Link from "next/link";
import { Web3ToolsApp } from "types";

interface AppCardProps {
  app: Web3ToolsApp;
}
const AppCard = ({ app }: AppCardProps) => {
  return (
    <>
      <Link href={app.path}>
        <a className="card p-4 relative bg-transparent rounded-md text-bold text-xl border-black border-2 hover:bg-solana before:content-[''] before:absolute before:border-2 before:border-solana before:rounded-md before:box-content before:w-full before:h-full before:bg-solana before:left-1 before:bottom-1">
          {app.name}
        </a>
      </Link>
    </>
  );
};

export default AppCard;
