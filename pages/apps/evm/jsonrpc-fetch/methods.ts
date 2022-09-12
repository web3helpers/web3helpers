export const methods = [
  {
    method: "eth_getBalance",
    params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],
    type: "wei"
  },
  {
    method: "eth_getStorageAt",
    params: [
      "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
      "0x0", // storage position at 0
      "0x2" // state at block number 2
    ],
    type: "hex"
  },
  {
    method: "eth_getTransactionCount",
    params: [
      "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
      "latest" // state at the latest block
    ],
    type: "hex"
  },
  {
    method: "eth_getBlockTransactionCountByHash",
    params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],
    type: "hex"
  },
  {
    method: "eth_getBlockTransactionCountByNumber",
    params: [
      "0xe8" // 232
    ],
    type: "hex"
  },
  {
    method: "eth_blockNumber",
    params: [],
    type: "hex"
  }
];
