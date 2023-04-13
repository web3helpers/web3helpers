import WalletPanel from "../../components/evm/WalletPanel";
import Link from "next/link";
import ThemeModeButton from "components/buttons/ThemeModeButton";

const NavBar = () => {
  return (
    <div className="max-w-6xl w-full my-4 px-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-2xl text-black dark:text-white px-4 md:px-0 md:text-4xl font-medium flex items-center">
          Web3.0{" "}
          <span className="border-2 ml-2 px-2 rounded-lg border-black dark:border-white text-2xl">
            Helpers
          </span>
        </span>
      </Link>
      <div className="flex flex-row">
        <ThemeModeButton></ThemeModeButton>
        <WalletPanel></WalletPanel>
      </div>
    </div>
  );
};

export default NavBar;
