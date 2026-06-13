import type { Metadata } from "next";
import TokenLaunchpad from "@/components/TokenLaunchpad";
import WalletButtons from "@/components/WalletButtons";

export const metadata: Metadata = {
  title: "Launch a token — Token Launchpad",
  description:
    "Connect your wallet, set your token's name, symbol, and supply, and mint it on Solana.",
};

// The actual token-creation app. Moved here from the homepage (/), which is
// now the marketing landing page. Wallet/network providers are supplied by the
// root layout, so they apply to this route automatically.
export default function LaunchPage() {
  return (
    <div>
      <WalletButtons />
      <TokenLaunchpad />
    </div>
  );
}
