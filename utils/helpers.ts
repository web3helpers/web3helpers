export function shortAddress(address?: string) {
  if (address == null) return "";
  return address.substring(0, 4) + "..." + address.substring(address.length - 4);
}

export function getAvatar(address?: string) {
  return `https://avatar.tobi.sh/${address}.png`;
}

export async function rpcRequest(url: string, method: string, params: any[]) {
  const response = await fetch(url, {
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const res = await response.json();
  if (res.result) return res.result;
  throw new Error(JSON.stringify(res.error));
}

export function arrayToString(params: any[]) {
  return (
    "[" +
    params
      .map((v) => {
        if (Array.isArray(v)) {
          return arrayToString(v);
        }
        if (typeof v === "object") {
          return JSON.stringify(v);
        }
        return JSON.stringify(v);
      })
      .toString() +
    "]"
  );
}
