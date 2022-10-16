export async function rpcRequest(url: string, method: string, params: any[]) {
  const response = await fetch(url, {
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const res = await response.json();
  if (res.result) return res.result;
  throw new Error(res.error);
}
