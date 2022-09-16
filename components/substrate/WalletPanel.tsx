/* eslint-disable @next/next/no-img-element */
import { getAvatar, shortAddress } from "utils";
import { XCircle } from "lucide-react";
import LoadingIcon from "../icons/LoadingIcon";
import SvgIcon from "../icons/SvgIcon";
import { getWallets, WalletAccount } from "@talismn/connect-wallets";
import { useState } from "react";

const DAPP_NAME = "Web3.0 helpers";
const WalletPanel = () => {
  const connectors = getWallets();
  console.log(connectors);

  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const walletConnect = connectors.map((connector) => (
    <button
      key={connector.title}
      className="mx-auto group flex items-center px-2 transition duration-300"
      onClick={async () => {
        try {
          await connector.enable(DAPP_NAME);
          const unsubscribe = await connector.subscribeAccounts((accounts?: WalletAccount[]) => {
            console.log(accounts);
            setAddress(accounts?.[0]?.address ?? "");
          });
        } catch (err) {
          //
        }
      }}
    >
      <img src={connector.logo.src} alt={connector.logo.alt} className="w-8 h-8" />
      {/* {isLoading && connector.id === pendingConnector?.id && (

            <LoadingIcon className="ml-2"></LoadingIcon>
          )} */}
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
          <button onClick={() => {}} className="ml-2">
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
