"use client";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import NetworkSelector from "./NetworkSelector";

const WalletButtons = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex justify-between p-5 ">
      <div className="flex gap-x-52">
        <WalletMultiButton/>
        <WalletDisconnectButton />
      </div>
                  
      <NetworkSelector/>
    </div>
  )
}

export default WalletButtons