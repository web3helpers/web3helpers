import { useNetwork, useSwitchNetwork } from "wagmi";
export const networks = [
  {
    id: 0x1,
    name: "Ethereum",
    url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
  },
  {
    id: 0x5,
    name: "Görli",
    url: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
  },
  {
    id: 0xaa36a7,
    name: "Sepolia",
    url: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
  },
  {
    id: 0x89,
    name: "Polygon",
    url: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
  },
  {
    id: 0x13881,
    name: "Mumbai",
    url: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
  },
  {
    id: 0x38,
    name: "BNB Smart Chain",
    url: "https://bsc-dataseed.binance.org/"
  },
  {
    id: 0x61,
    name: "BNB Smart Chain Testnet",
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/"
  }
];

const NetworkSelecotr = (props: any) => {
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  return (
    <>
      <select
        value={chain?.id}
        onChange={(event) => {
          switchNetwork!(parseInt(event.target.value));
        }}
        {...props}
      >
        {networks.map((n) => (
          <option value={n.id} key={n.id}>
            {n.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default NetworkSelecotr;
