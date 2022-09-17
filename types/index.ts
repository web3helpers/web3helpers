export interface Meta {
  description?: string;
  logo?: string;
  ogImage?: string;
  ogUrl?: string;
  title?: string;
  twitter?: string;
}

export interface Chain {
  name: string;
  color: string;
  icons: string[];
}

export interface Web3ToolsApp {
  name: string;
  path: string;
  chain: Chain;
  id: number;
}

export interface Condition {
  chain?: string;
  search?: string;
}
