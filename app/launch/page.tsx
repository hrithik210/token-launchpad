import TokenLaunchpad from "@/components/TokenLaunchpad";
import WalletButtons from "@/components/WalletButtons";

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
