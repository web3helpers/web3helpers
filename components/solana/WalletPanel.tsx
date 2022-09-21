/* eslint-disable @next/next/no-img-element */
import { getAvatar, shortAddress } from "utils";
import { XCircle } from "lucide-react";
import LoadingIcon from "../icons/LoadingIcon";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

const WalletPanel = () => {
  const { wallets, wallet, select, connecting, publicKey, disconnect } = useWallet();
  const walletConnect = wallets.map((connector) => (
    <button
      key={connector.adapter.name}
      className="mx-auto group flex items-center px-2 transition duration-300"
      onClick={() => {
        if (connector.readyState === WalletReadyState.Installed) {
          select(connector.adapter.name);
        } else {
          window.open(connector.adapter.url, "_blank");
        }
      }}
    >
      <img src={connector.adapter.icon} alt={connector.adapter.name} className="w-8 h-8" />
      {connecting && wallet?.adapter.name === connector.adapter.name && (
        <LoadingIcon className="ml-2"></LoadingIcon>
      )}
    </button>
  ));
  const address = useMemo(() => publicKey?.toBase58(), [publicKey]);

  return (
    <div className="p-2 text-center rounded-full flex  gap-4 border-black border-2">
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
