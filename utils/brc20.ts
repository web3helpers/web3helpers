// import { createPersistStore } from '@/background/utils';
import {
  AddressAssets,
  AddressTokenSummary,
  AppSummary,
  BitcoinBalance,
  DecodedPsbt,
  FeeSummary,
  InscribeOrder,
  Inscription,
  InscriptionSummary,
  TokenBalance,
  TokenTransfer,
  TxHistoryItem,
  UTXO
} from "../types/brc20.js";

enum API_STATUS {
  FAILED = "0",
  SUCCESS = "1"
}

type BitcoinNetwork = "bitcoin" | "bitcoin_testnet";

const BRC20_API_CONFIG: {
  [key in BitcoinNetwork]: { network: string; url: string };
} = {
  bitcoin: {
    network: "btc",
    url: "https://unisat.io/api"
  },
  bitcoin_testnet: {
    network: "btc_testnet",
    url: "https://unisat.io/testnet/api"
  }
};

export class OpenApiService {
  public network;
  private host;
  constructor(network: BitcoinNetwork) {
    this.network = network;
    this.host = BRC20_API_CONFIG[this.network].url;
  }

  getHost = () => {
    return this.host;
  };

  httpGet = async (route: string, parameters: any) => {
    let url = this.getHost() + route;
    let c = 0;
    for (const id in parameters) {
      url += c === 0 ? "?" : "&";
      url += `${id}=${parameters[id]}`;
      c++;
    }
    const headers = new Headers();
    headers.append("X-Client", "UniSat Wallet");
    headers.append("X-Version", "1.1.19");
    const response = await fetch(new Request(url), {
      method: "GET",
      headers,
      mode: "cors",
      cache: "default"
    });
    const data = await response.json();
    return data;
  };

  httpPost = async (route: string, parameters: any) => {
    const url = this.getHost() + route;
    const headers = new Headers();
    headers.append("X-Client", "UniSat Wallet");
    headers.append("X-Version", "1.1.19");
    headers.append("Content-Type", "application/json;charset=utf-8");
    const response = await fetch(new Request(url), {
      method: "POST",
      headers,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(parameters)
    });
    const data = await response.json();
    return data;
  };

  async getWalletConfig(): Promise<any> {
    const data = await this.httpGet("/v1/wallet/config", {});
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getAddressBalance(address: string): Promise<BitcoinBalance> {
    const data = await this.httpGet("/v2/address/balance", {
      address
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getMultiAddressAssets(addresses: string): Promise<AddressAssets[]> {
    const data = await this.httpGet("/v3/address/multi-assets", {
      addresses
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getAddressUtxo(address: string): Promise<UTXO[]> {
    const data = await this.httpGet("/v3/address/btc-utxo", {
      address
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getInscriptionUtxo(inscriptionId: string): Promise<UTXO> {
    const data = await this.httpGet("/v3/inscription/utxo", {
      inscriptionId
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getInscriptionUtxos(inscriptionIds: string[]): Promise<UTXO[]> {
    const data = await this.httpPost("/v3/inscription/utxos", {
      inscriptionIds
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getAddressInscriptions(
    address: string,
    cursor: number,
    size: number
  ): Promise<{ list: Inscription[]; total: number }> {
    const data = await this.httpGet("/v3/address/inscriptions", {
      address,
      cursor,
      size
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getAddressRecentHistory(address: string): Promise<TxHistoryItem[]> {
    const data = await this.httpGet("/v1/address/recent-history", {
      address
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getInscriptionSummary(): Promise<InscriptionSummary> {
    const data = await this.httpGet("/v3/inscription-summary", {});
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getAppSummary(): Promise<AppSummary> {
    const data = await this.httpGet("/v1/app-summary", {});
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async pushTx(rawtx: string): Promise<string> {
    const data = await this.httpPost("/v3/tx/broadcast", {
      rawtx
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getFeeSummary(): Promise<FeeSummary> {
    const data = await this.httpGet("/v1/fee-summary", {});
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getDomainInfo(domain: string): Promise<Inscription> {
    const data = await this.httpGet("/v3/address/search", { domain });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async inscribeBRC20Transfer(
    address: string,
    tick: string,
    amount: string,
    feeRate: number
  ): Promise<InscribeOrder> {
    const data = await this.httpPost("/v3/brc20/inscribe-transfer", {
      address,
      tick,
      amount,
      feeRate
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getInscribeResult(orderId: string): Promise<TokenTransfer> {
    const data = await this.httpGet("/v3/brc20/order-result", { orderId });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getAddressTokenBalances(
    address: string,
    cursor: number,
    size: number
  ): Promise<{ list: TokenBalance[]; total: number }> {
    const data = await this.httpGet("/v3/brc20/tokens", {
      address,
      cursor,
      size
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getAddressTokenSummary(address: string, ticker: string): Promise<AddressTokenSummary> {
    const data = await this.httpGet("/v3/brc20/token-summary", {
      address,
      ticker: encodeURIComponent(ticker)
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async getTokenTransferableList(
    address: string,
    ticker: string,
    cursor: number,
    size: number
  ): Promise<{ list: TokenTransfer[]; total: number }> {
    const data = await this.httpGet("/v3/brc20/transferable-list", {
      address,
      ticker: encodeURIComponent(ticker),
      cursor,
      size
    });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }

  async decodePsbt(psbtHex: string): Promise<DecodedPsbt> {
    const data = await this.httpPost("/v3/tx/decode", { psbtHex });
    if (data.status === API_STATUS.FAILED) {
      throw new Error(data.message);
    }
    return data.result;
  }
}
