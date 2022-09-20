import "../styles/globals.css";
import "vercel-toast-center/css";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { configureChains, createClient, defaultChains, WagmiConfig } from "wagmi";
import { ThemeProvider } from "next-themes";
import { WalletConfig } from "@web3helpers/substrate-wallet";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

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

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <WalletConfig config={{ dappName: "WebHelpers" }}>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </WalletConfig>
    </ThemeProvider>
  );
}

export default MyApp;
