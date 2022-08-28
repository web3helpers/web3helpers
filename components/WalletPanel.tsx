/* eslint-disable @next/next/no-img-element */
import { getAvatar, shortAddress } from "utils";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { XCircle } from "lucide-react";
import LoadingIcon from "./icons/LoadingIcon";
import SvgIcon from "./icons/SvgIcon";

export interface WalletPanelProps {
  show: boolean;
}

const WalletPanel = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const disconnectWallet = () => {
    disconnect();
  };

  const walletConnect = connectors.map(
    (connector) =>
      connector.ready && (
        <button
          disabled={!connector.ready}
          key={connector.id}
          className="mx-auto group flex items-center px-2 transition duration-300"
          onClick={() => {
            connect({ connector });
          }}
        >
          <SvgIcon name={connector.name} className="w-10 h-10" />
          {isLoading && connector.id === pendingConnector?.id && (
            <LoadingIcon className="ml-2"></LoadingIcon>
          )}
        </button>
      )
  );

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
            <span className="h-[40] font-mono text-lg text-black">
              {shortAddress(address)}
            </span>
          </div>
          <button onClick={() => disconnectWallet()} className="ml-2">
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
