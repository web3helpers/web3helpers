import { decode } from "pages/apps/evm/decode-raw-transaction/utils";
import { expect, test } from "vitest";

test("decode raw transaction", () => {
  let rawTxHex =
    "0xed8205fc843b9aca00825208944592d8f8d7b001e72cb26a73e4fa1806a51ac79d88016345785d8a000080808080";
  let decoded = decode(rawTxHex);
  expect(decoded.type).toBe("legacy");
  rawTxHex =
    "0x02f8730112843b9aca00850196c9ea54825208943422f86710d69d59faedded97c483908747c06918801a62f1fe203aa4880c001a07b33138e4ccb12221e441bb6017f61177158cb4c33c7dfe0de65c5896469f2a7a03062033b5ceb38e5e01523404fa4e18eead35cc20d90c14d34cc97d1057ca031";
  decoded = decode(rawTxHex);
  expect(decoded.type).toBe("eip1559");
});
