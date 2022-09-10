import * as ethers from "ethers";

export function decode(rawTransaction: string) {
  if (rawTransaction.startsWith("0x02"))
    rawTransaction = "0x" + rawTransaction.substring(4);
  const decoded = ethers.utils.RLP.decode(rawTransaction) as string[];
  let keys: string[], type: "legency" | "eip1559";
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
      "data",
      "accessList",
      "v",
      "r",
      "s",
    ];
  }
  console.log(decoded);
  
  return { type, ...Object.fromEntries(keys.map((k, i) => [k, decoded[i]])) };
}
