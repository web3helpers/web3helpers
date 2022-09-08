import { decode } from "../utils";
import { test } from "vitest";

test("decode raw transaction", () => {
  const rawTxHex =
    "0xed8205fc843b9aca00825208944592d8f8d7b001e72cb26a73e4fa1806a51ac79d88016345785d8a000080808080";
  const decoded = decode(rawTxHex);
  console.log(decoded);
});
