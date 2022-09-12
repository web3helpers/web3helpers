import * as ethers from "ethers";

export function decode(rawTransaction: string) {
  if (rawTransaction.startsWith("0x02")) rawTransaction = "0x" + rawTransaction.substring(4);
  const decoded = ethers.utils.RLP.decode(rawTransaction) as string[];
  let keys: string[], type: "legacy" | "eip1559";
  if (decoded.length === 9) {
    type = "legacy";
    keys = ["nonce", "gasPrice", "gasLimit", "to", "value", "data", "v", "r", "s"];
  } else {
    type = "eip1559";
    keys = [
      "chainId",
      "nonce",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
      "gasLimit",
      "to",
      "value",
      "data",
      "accessList",
      "v",
      "r",
      "s"
    ];
  }
  return { type, ...Object.fromEntries(keys.map((k, i) => [k, decoded[i]])) };
}
