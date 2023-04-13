import "../styles/globals.css";
import "vercel-toast-center/css";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { ThemeProvider } from "next-themes";
import { WalletConfig as SubstrateWalletConfig } from "@web3helpers/substrate-wallet";
import { WalletConfig as AptosWalletConfig } from "@web3helpers/aptos-wallet";
import { WalletConfig as SuiWalletConfig } from "@web3helpers/sui-wallet";
import { SpotWalletAdapter } from "@solana/wallet-adapter-spot";
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow";
import type { AppProps } from "next/app";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { EthosConnectProvider } from "ethos-connect";
import { evmNetworks } from "utils";

const { chains, provider, webSocketProvider } = configureChains(evmNetworks, [publicProvider()]);
const solanaNetwork = WalletAdapterNetwork.Devnet;

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({
      chains,
      options: {
        // projectId: "1dab147d6c2fb386399ecbb3e5a7a79d"
        qrcode: true
      }
    })
  ],
  provider,
  webSocketProvider
});

function MyApp({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => clusterApiUrl(solanaNetwork), []);
  const wallets = useMemo(() => [new SpotWalletAdapter(), new GlowWalletAdapter()], []);

  return (
    <ThemeProvider attribute="class">
      <Tooltip.Provider>
        <SubstrateWalletConfig config={{ dappName: "WebHelpers" }}>
          <AptosWalletConfig>
            <EthosConnectProvider>
              <WagmiConfig client={client}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <Component {...pageProps} />
                  </WalletProvider>
                </ConnectionProvider>
              </WagmiConfig>
            </EthosConnectProvider>
          </AptosWalletConfig>
        </SubstrateWalletConfig>
      </Tooltip.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
