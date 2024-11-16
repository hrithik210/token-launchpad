import { TokenLaunchpad } from "@/components/TokenLaunchpad";
import WalletButtons from "@/components/WalletButtons";

export default function Home() {
  return (
    <div>
      <WalletButtons />
      <TokenLaunchpad />
    </div>
  );
}
