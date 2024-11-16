import type { Chain } from "viem";

export const viemChainToCustomNetwork = (
  viemChain: Chain,
  iconUrl?: string
) => {
  return {
    blockExplorerUrls: viemChain.blockExplorers?.default?.url
      ? [viemChain.blockExplorers.default.url]
      : [],
    chainId: viemChain.id,
    chainName: viemChain.name,
    iconUrls: iconUrl ? [iconUrl] : [],
    name: viemChain.name,
    nativeCurrency: {
      decimals: viemChain.nativeCurrency.decimals,
      name: viemChain.nativeCurrency.name,
      symbol: viemChain.nativeCurrency.symbol,
    },
    networkId: viemChain.id,
    rpcUrls: viemChain.rpcUrls?.default?.http
      ? [...viemChain.rpcUrls.default.http]
      : [],
  };
};
