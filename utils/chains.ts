import { Chain } from "wagmi";

export const cronos: Chain = {
  id: 25,
  name: "Cronos",
  network: "cronos",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRO"
  },
  rpcUrls: {
    default: { http: ["https://node.croswap.com/rpc"] },
    public: { http: ["https://node.croswap.com/rpc"] }
  },
  blockExplorers: {
    etherscan: { name: "CronosScan", url: "https://cronoscan.com" },
    default: { name: "CronosScan", url: "https://cronoscan.com" }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1963112
    }
  }
};
export const cronosTestnet: Chain = {
  id: 338,
  name: "Cronos Testnet",
  network: "cronos",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "TCRO"
  },
  rpcUrls: {
    default: { http: ["https://evm-t3.cronos.org"] },
    public: { http: ["https://evm-t3.cronos.org"] }
  },
  blockExplorers: {
    etherscan: { name: "CronosScan", url: "https://testnet.cronoscan.com/" },
    default: { name: "CronosScan", url: "https://testnet.cronoscan.com/" }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1963112
    }
  }
};
