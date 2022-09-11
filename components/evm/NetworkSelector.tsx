import { useNetwork, useSwitchNetwork } from "wagmi";
export const networks = [
  {
    id: 0x1,
    name: "Ethereum mainnet",
    url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
  },
  {
    id: 0x4,
    name: "Rinkeby",
    url: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
  },
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
