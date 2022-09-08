import * as ethers from "ethers";
type TransactionType = "legency" | "eip1559";
export function decode(rawTransaction: string) {
  const decoded = ethers.utils.RLP.decode(rawTransaction) as string[];
  let keys, type;
  if (decoded.length === 9) {
    type = "legency";
    keys = [
      "nonce",
      "gasPrice",
      "gasLimit",
      "to",
      "value",
      "data",
      "v",
      "r",
      "s",
    ];
  } else {
    type = "eip1559";
    keys = [
      "chainId",
      "nonce",
      "maxPriorityFeePerGas",
      "maxFeePerGas",
      "destination",
      "value",
      "accessList",
      "v",
      "r",
      "s",
    ];
  }
  return { type, ...Object.fromEntries(keys.map((k, i) => [k, decoded[i]])) };
}
