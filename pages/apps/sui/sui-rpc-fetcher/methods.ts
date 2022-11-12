export const methods = [
  {
    method: "sui_batchTransaction",
    docs: "Create an unsigned batched transaction.",
    params: [
      [
        "0x9b07815f04497e2e05d22cac3aa061410b20868c",
        [
          {
            moveCallRequestParams: {
              packageObjectId: "0x0000000000000000000000000000000000000002",
              module: "devnet_nft",
              function: "mint",
              typeArguments: [],
              arguments: [
                "Example NFT",
                "An NFT created by the Sui Command Line Tool",
                "ipfs://bafkreibngqhl3gaa7daob4i2vccziay2jjlp435cf66vhono7nrvww53ty"
              ]
            }
          },
          {
            transferObjectRequestParams: {
              recipient: "0xc619154c42a1c61be9902717b24b8ec168fe4896",
              objectId: "0xefef92cbf44b581f23222c10916b17a369b4da03"
            }
          }
        ],
        "0xf5b70ccb10f1a705e061d0fdfa189618d28b0d44",
        1000
      ]
    ],
    type: "object"
  },
  {
    method: "sui_dryRunTransaction",
    docs: `Execute the transaction and wait for results if desired. 
    Request types: 1. ImmediateReturn: immediately returns a response 
    to client without waiting for any execution results. 
    Note the transaction may fail without being noticed by client in 
    this mode. After getting the response, the client may poll the node 
    to check the result of the transaction. 2. WaitForTxCert: waits for
     TransactionCertificate and then return to client. 
     3. WaitForEffectsCert: waits for TransactionEffectsCert and then 
     return to client. This mode is a proxy for transaction finality. 4
     . WaitForLocalExecution: waits for TransactionEffectsCert and make sure the node executed the transaction locally before returning the client. The local execution makes sure this node is aware of this transaction when client fires subsequent queries. However if the node fails to execute the transaction locally in a timely manner, a bool type in the response is set to false to indicated the case.`,
    params: [
      "VHJhbnNhY3Rpb25EYXRhOjoAAENs56klSzDSU+RWfMr6XzbOhMgKqLyb5k4NWueWiEJ0rvMAWuZzOAkCAAAAAAAAACAyE4rjTSLmOXrzqaceTvofutFssM+v3lsohIWOg/pBRqB5d3G4/iYvpOg6GofMBk8jRD6NyOwdW4TdYonhk7n4jeSplDWMn4UCAAAAAAAAACBhNSNsPnWpJeHHesNBJ8i6776gk58VJHErTTegILKM3QEAAAAAAAAA6AMAAAAAAAA=",
      "ED25519",
      "0Pu2s/M1xPeMArRmsLnIosKcqi9BWDFUJp6IVUHEtJlz7vp2wAv227n5gNn059Vm7FUfYs36P5eHrQ6IaW57BQ==",
      "i4VvPsULQhSm++R+hpszac5EOLnJbh02NAMScP/4+L0=",
      "WaitForLocalExecution"
    ],
    type: "object"
  },
  {
    method: "sui_getEventsByModule",
    docs: "Return events emitted in a specified Move module",
    params: ["0x0000000000000000000000000000000000000002", "devnet_nft", 5, 0, 10],
    type: "object"
  },
  {
    method: "sui_getEventsByMoveEventStructName",
    docs: "Return events with the given move event struct name",
    params: ["0x2::devnet_nft::MintNFTEvent", 5, 0, 10],
    type: "object"
  },
  {
    method: "sui_getEventsByObject",
    docs: "Return events associated with the given object",
    params: ["0xbdec549c7cdea06bc4a1d339a22521eea933b889", 2, 0, 10],
    type: "object"
  },
  {
    method: "sui_getEventsByRecipient",
    docs: "Return events associated with the given recipient",
    params: [
      {
        AddressOwner: "0x8581e7115f3d762b5057bc2a187b79e31a5ccbc4"
      },
      2,
      0,
      10
    ],
    type: "object"
  },
  {
    method: "sui_getEvents",
    docs: "Return list of events for a specified query criteria.",
    params: [
      {
        Transaction: "Vi63z0O8cI/1smk/OYkxoECgOF4LxllfNwKQCDlHxmk="
      },
      "10:0",
      1,
      false
    ],
    type: "object"
  },
  {
    method: "sui_getMoveFunctionArgTypes",
    docs: "",
    params: []
  },
  {
    method: "sui_getNormalizedMoveFunction",
    docs: "Return a structured representation of Move function",
    params: [],
    type: "object"
  },
  {
    method: "sui_getNormalizedMoveModule",
    docs: "Return a structured representation of Move module",
    params: [],
    type: "object"
  },
  {
    method: "sui_getNormalizedMoveModulesByPackage",
    docs: "Return structured representations of all modules in the given package",
    params: [],
    type: "object"
  },
  {
    method: "sui_getNormalizedMoveStruct",
    docs: "Return a structured representation of Move struct",
    params: [],
    type: "object"
  },
  {
    method: "sui_getObject",
    docs: "Return the object information for a specified object",
    params: ["0x332c3846d783cc2d3a2a005c2cd512bb59e844ec"],
    type: "object"
  },
  {
    method: "sui_getObjectsOwnedByAddress",
    docs: "Return the list of objects owned by an address.",
    params: ["0xc9bd141861e9da3999af4c3ce55f2f2ba13d659e"],
    type: "object"
  },
  {
    method: "sui_getObjectsOwnedByObject",
    docs: "Return the list of objects owned by an object.",
    params: ["0x332c3846d783cc2d3a2a005c2cd512bb59e844ec"],
    type: "object"
  },
  {
    method: "sui_getRawObject",
    docs: "Return the raw BCS serialized move object bytes for a specified object.",
    params: ["0x332c3846d783cc2d3a2a005c2cd512bb59e844ec"],
    type: "object"
  },
  {
    method: "sui_getTotalTransactionNumber",
    docs: "Return the total number of transactions known to the server.",
    params: [],
    type: "object"
  },
  {
    method: "sui_getTransaction",
    docs: "Return the transaction response object for specified transaction digest",
    params: ["ECyIV7XCNf7OokHWCVejY1yDh6YdqAdj5aL2Ccb4QyA="],
    type: "object"
  },
  {
    method: "sui_getTransactions",
    docs: "Return list of transactions for a specified query criteria.",
    params: [
      {
        InputObject: "0x557dc42aaefeeb8c154d7ddc456b8aeaa3132c74"
      },
      "A1MdyY6D9uGY0tfRe6kd3H5xfPcIyTcGDwQEhzbsM/s=",
      100,
      false
    ]
  },
  {
    method: "sui_getTransactionsInRange",
    docs: "Return list of transaction digests within the queried range.",
    params: []
  },
  {
    method: "sui_mergeCoins",
    docs: "Create an unsigned transaction to merge multiple coins into one coin.",
    params: []
  },
  {
    method: "sui_moveCall",
    docs: "Create an unsigned transaction to execute a Move call on the network, by calling the specified function in the module of a given package.",
    params: []
  },
  {
    method: "sui_pay",
    docs: "Send Coin<T> to a list of addresses, where `T` can be any coin type, following a list of amounts, The object specified in the `gas` field will be used to pay the gas fee for the transaction. The gas object can not appear in `input_coins`. If the gas object is not specified, the RPC server will auto-select one.",
    params: []
  },
  {
    method: "sui_payAllSui",
    docs: "Send all SUI coins to one recipient. This is for SUI coin only and does not require a separate gas coin object. Specifically, what pay_all_sui does are: 1. accumulate all SUI from input coins and deposit all SUI to the first input coin 2. transfer the updated first coin to the recipient and also use this first coin as gas coin object. 3. the balance of the first input coin after tx is sum(input_coins) - actual_gas_cost. 4. all other input coins other than the first are deleted.",
    params: []
  },
  {
    method: "sui_paySui",
    docs: "Send SUI coins to a list of addresses, following a list of amounts. This is for SUI coin only and does not require a separate gas coin object. Specifically, what pay_sui does are: 1. debit each input_coin to create new coin following the order of amounts and assign it to the corresponding recipient. 2. accumulate all residual SUI from input coins left and deposit all SUI to the first input coin, then use the first input coin as the gas coin object. 3. the balance of the first input coin after tx is sum(input_coins) - sum(amounts) - actual_gas_cost 4. all other input coints other than the first one are deleted.",
    params: []
  },
  {
    method: "sui_publish",
    docs: "Create an unsigned transaction to publish Move module.",
    params: []
  },
  {
    method: "sui_splitCoin",
    docs: "Create an unsigned transaction to split a coin object into multiple coins.",
    params: []
  },
  {
    method: "sui_splitCoinEqual",
    docs: "Create an unsigned transaction to split a coin object into multiple equal-size coins.",
    params: []
  },
  {
    method: "sui_transferObject",
    docs: "Create an unsigned transaction to transfer an object from one address to another. The object's type must allow public transfers",
    params: []
  },
  {
    method: "sui_transferSui",
    docs: "Create an unsigned transaction to send SUI coin object to a Sui address. The SUI object is also used as the gas object.",
    params: []
  },
  {
    method: "sui_tryGetPastObject",
    docs: "Note there is no software-level guarantee/SLA that objects with past versions can be retrieved by this API, even if the object and version exists/existed. The result may vary across nodes depending on their pruning policies. Return the object information for a specified version",
    params: ["0x332c3846d783cc2d3a2a005c2cd512bb59e844ec", 4],
    type: "object"
  }
];
