/* eslint-disable @next/next/no-img-element */
import { getAvatar, shortAddress } from "utils";
import { XCircle } from "lucide-react";
import LoadingIcon from "../icons/LoadingIcon";
import { getWallets } from "@talismn/connect-wallets";
import { useAccounts } from "@web3helpers/substrate-wallet";

const WalletPanel = () => {
  const connectors = getWallets();
  const { connect, loading, address, disconnect } = useAccounts();
  const walletConnect = connectors.map((connector) => (
    <button
      key={connector.title}
      className="mx-auto group flex items-center px-2 transition duration-300"
      onClick={() => {
        if (connector.installed) {
          connect(connector);
        } else {
          window.open(connector.installUrl, "_blank");
        }
      }}
    >
      <img src={connector.logo.src} alt={connector.logo.alt} className="w-8 h-8" />
      {loading && connector.title === loading && <LoadingIcon className="ml-2"></LoadingIcon>}
    </button>
  ));

  return (
    <div className="p-2 text-center rounded-full flex flex-row items-center gap-4 border-black border-2">
      {address ? (
        <>
          <img
            src={getAvatar(address)}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <span className="h-[40] font-mono text-lg text-black">{shortAddress(address)}</span>
          </div>
          <button
            onClick={() => {
              disconnect();
            }}
            className="ml-2"
          >
            <XCircle color="black"></XCircle>
          </button>
        </>
      ) : (
        walletConnect
      )}
    </div>
  );
};

export default WalletPanel;
