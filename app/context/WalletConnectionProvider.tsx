"use client";

import React, { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import {
    WalletModalProvider,

} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';



interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

const WalletConnectionProvider: FC<WalletConnectionProviderProps> = ({
  children
}) => {
  const [network, setNetwork] = useState<Network>('devnet')

  const endpoint = useMemo(() => {
    switch (network) {
      case 'devnet':
        return process.env.NEXT_PUBLIC_DEVNET_URL
      case 'testnet':
        return process.env.NEXT_PUBLIC_TESTNET_URL
      case 'mainnet-beta':
        return process.env.NEXT_PUBLIC_MAINNET_URL
      default:
        return process.env.NEXT_PUBLIC_DEVNET_URL
    }
  }, [network])
  return (
    <ConnectionProvider endpoint={endpoint as string}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                <NetworkSelector onNetworkChange={setNetwork} />
                  {children }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  );
};

export default WalletConnectionProvider 