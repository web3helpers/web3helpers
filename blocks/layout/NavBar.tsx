import WalletPanel from "../../components/evm/WalletPanel";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="max-w-6xl w-full my-4 px-4 flex justify-between items-center">
      <Link href="/">
        <a className="text-2xl px-4 md:px-0 md:text-4xl font-medium flex items-center">
          Web3.0{" "}
          <span className="border-4 ml-2 px-2 rounded-lg border-black text-2xl">Helpers</span>
        </a>
      </Link>
      <WalletPanel></WalletPanel>
    </div>
  );
};

export default NavBar;
