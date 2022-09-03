import Link from "next/link";

interface AppCardProps {
  name: string;
  link: string;
}
const AppCard = ({ name, link }: AppCardProps) => {
  return (
    <>
      <Link href={link}>
        <a className="card p-4 relative bg-transparent rounded-md text-bold text-xl border-black border-2 hover:bg-solana before:content-[''] before:absolute before:border-2 before:border-solana before:rounded-md before:box-content before:w-full before:h-full before:bg-solana before:left-1 before:bottom-1">
          {name}
        </a>
      </Link>
    </>
  );
};

export default AppCard;
