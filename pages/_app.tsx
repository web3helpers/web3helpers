import "../styles/globals.css";
import "vercel-toast-center/css";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { configureChains, createClient, defaultChains, WagmiConfig } from "wagmi";
import { ThemeProvider } from "next-themes";
import { WalletConfig } from "@web3helpers/substrate-wallet";
import { SpotWalletAdapter } from "@solana/wallet-adapter-spot";
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow";
import type { AppProps } from "next/app";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import * as Tooltip from "@radix-ui/react-tooltip";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);
const solanaNetwork = WalletAdapterNetwork.Devnet;

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({
      chains,
      options: {
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
        <WalletConfig config={{ dappName: "WebHelpers" }}>
          <WagmiConfig client={client}>
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
                <Component {...pageProps} />
              </WalletProvider>
            </ConnectionProvider>
          </WagmiConfig>
        </WalletConfig>
      </Tooltip.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
