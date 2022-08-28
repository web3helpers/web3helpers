import WalletPanel from "../../components/WalletPanel";

const NavBar = () => {
  return (
    <div className="max-w-5xl w-full my-4 flex justify-between items-center">
      <span className="text-4xl font-medium">Web 3 Tools</span>
      <WalletPanel></WalletPanel>
    </div>
  );
};

export default NavBar;
