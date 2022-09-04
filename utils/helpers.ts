export function shortAddress(address?: string) {
  if (address == null) return "";
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

export function getAvatar(address?: string) {
  return `https://avatar.tobi.sh/${address}.png`;
}

export function generateCustomClassName(prefix: string[], color: string) {
  return prefix.map((p) => p + "-" + color).join(" ");
}