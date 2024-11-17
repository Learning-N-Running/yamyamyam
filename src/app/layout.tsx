import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/layout/Layout";
import GlobalStyle from "@/styles/global";
import Providers from "@/redux/provider";
import "next-cloudinary/dist/cld-video-player.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useRouter } from "next/navigation";
import { viemChainToCustomNetwork } from "@/lib/chainConverter";
import { mantleSepoliaTestnet } from "viem/chains";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yumyumyum",
  description: "Food Reveiwing NFT Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dynamic_pkey = process.env.NEXT_PUBLIC_DYNAMIC_PRIVATE_KEY;
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <Providers>
          {/* <DynamicContextProvider
            settings={{
              environmentId: dynamic_pkey as string,
              walletConnectors: [EthereumWalletConnectors],
              overrides: {
                evmNetworks: [
                  viemChainToCustomNetwork(
                    mantleSepoliaTestnet,
                    "https://cdn-icons-png.flaticon.com/512/14446/14446189.png"
                  ),
                ],
              },
            }}
          > */}
          <DynamicContextProvider
            settings={{
              environmentId: dynamic_pkey as string,
              walletConnectors: [EthereumWalletConnectors],
            }}
          >
            <Layout>{children}</Layout>
          </DynamicContextProvider>
        </Providers>
      </body>
    </html>
  );
}
