import { expect, test } from "vitest";
import { generateAddress } from "pages/apps/filecoin/new-address/index";

test("generate address", async () => {
  const { address } = await generateAddress("ecdsa");
  expect(address.substring(0, 2)).toBe("f1");

  const { address: blsAddress } = await generateAddress("bls");
  expect(blsAddress.substring(0, 2)).toBe("f3");
});
