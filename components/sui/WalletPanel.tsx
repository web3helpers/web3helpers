/* eslint-disable @next/next/no-img-element */
import { getAvatar, shortAddress } from "utils";
import { XCircle } from "lucide-react";
import LoadingIcon from "../icons/LoadingIcon";
import { ethos } from "ethos-connect";

const WalletPanel = () => {
  const { wallets, wallet, selectWallet } = ethos.useWallet();
  const walletConnect = wallets?.map((connector) => {
    return (
      <button
        key={connector.name}
        className="mx-auto group flex items-center px-2 transition duration-300"
        onClick={async () => {
          selectWallet?.(connector.name);
        }}
      >
        <img src={connector.icon} alt={connector.name} className="w-8 h-8" />
        {connector.connecting && <LoadingIcon className="ml-2"></LoadingIcon>}
      </button>
    );
  });

  return (
    <div className="p-2 text-center rounded-full flex flex-row items-center gap-4 border-black border-2">
      {wallet?.address ? (
        <>
          <img
            src={getAvatar(wallet?.address)}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <span className="h-[40] font-mono text-lg text-black">
              {shortAddress(wallet?.address)}
            </span>
          </div>
          <button
            onClick={() => {
              wallet?.disconnect();
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
