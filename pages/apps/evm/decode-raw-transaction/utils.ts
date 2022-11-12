import * as ethers from "ethers";

export function decode(rawTransaction: string) {
  const transaction = ethers.utils.parseTransaction(rawTransaction);
  const types = ["legacy", "eip2930", "eip1559"];
  const BN = ethers.BigNumber;
  Object.keys(transaction).forEach((value) => {
    if (BN.isBigNumber(transaction[value])) transaction[value] = transaction[value].toHexString();
  });
  return { ...transaction, type: types[transaction.type ?? 0] };
}
