// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AddressType, NetworkType } from "types/brc20";
import { LocalWallet, createSendOrd } from "utils/ords";
import { OpenApiService } from "utils/brc20";
import { networks } from "bitcoinjs-lib";

type Data = {
  error?: string;
  hash?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { address: toAddress, ticker } = req.query;
  const wif = process.env.WIF;
  const wallet = new LocalWallet(wif as string, NetworkType.TESTNET, AddressType.P2TR);
  if (!toAddress || !ticker) {
    res.status(400).json({
      error: "Address and ticker are required"
    });
  }
  const brc20Api = new OpenApiService("bitcoin_testnet");
  const brc20Summary = await brc20Api.getAddressTokenSummary(wallet.address, ticker as string);
  console.log(wallet.address, toAddress, "is requesting", ticker, brc20Summary.transferableList);
  if (!brc20Summary) {
    res.status(404).json({
      error: "Api request error, please try again later"
    });
  }
  if (brc20Summary.transferableList.length === 0) {
    res.status(404).json({
      error: "Trsanfer inscriptions not found, please try again later"
    });
  }
  const inscriptionUtxos = await brc20Api.getInscriptionUtxos([
    brc20Summary.transferableList[0].inscriptionId
  ]);
  const utxos = await brc20Api.getAddressUtxo(wallet.address);
  const pubkey = wallet.getPublicKey();
  const params = {
    utxos: [...inscriptionUtxos, ...utxos].map((v) => {
      return {
        txId: v.txId,
        outputIndex: v.outputIndex,
        satoshis: v.satoshis,
        scriptPk: v.scriptPk,
        addressType: v.addressType,
        address: wallet.address,
        ords: v.inscriptions ?? []
      };
    }),
    toOrdId: brc20Summary.transferableList[0].inscriptionId,
    outputValue: 500,
    toAddress: toAddress as string,
    wallet,
    changeAddress: wallet.address,
    receiverToPayFee: false,
    pubkey,
    feeRate: 100,
    dump: true,
    network: networks.testnet
  };

  const psbt = await createSendOrd(params);

  const hash = await brc20Api.pushTx(psbt.extractTransaction().toHex());
  res.status(200).json({ hash });
}
