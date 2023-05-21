import { useNetwork, useSwitchNetwork } from "wagmi";
import { evmNetworks as networks } from "utils";

const NetworkSelector = (props: any) => {
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

export default NetworkSelector;
