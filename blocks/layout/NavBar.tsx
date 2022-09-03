import WalletPanel from "../../components/WalletPanel";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="max-w-5xl w-full my-4 flex justify-between items-center">
      <Link href="/">
        <a className="text-4xl font-medium">Web 3 Tools</a>
      </Link>
      <WalletPanel></WalletPanel>
    </div>
  );
};

export default NavBar;
