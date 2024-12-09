"use client";

import React, { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import {
    WalletModalProvider,

} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import NetworkSelector from '@/components/NetworkSelector';
import { useNetwork } from './NetworkContext';

type Network = 'devnet' | 'testnet' | 'mainnet-beta'

interface WalletConnectionProviderProps {
  children: React.ReactNode
}

interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

const WalletConnectionProvider: FC<WalletConnectionProviderProps> = ({
  children
}) => {
  const {currentNetwork}= useNetwork()

  const endpoint = useMemo(() => {
    switch (currentNetwork) {
      case 'devnet':
        return process.env.NEXT_PUBLIC_DEVNET_URL
      case 'mainnet-beta':
        return process.env.NEXT_PUBLIC_MAINNET_URL
      default:
        return process.env.NEXT_PUBLIC_DEVNET_URL
    }
  }, [currentNetwork])
  return (
    <ConnectionProvider endpoint={endpoint as string}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  {children }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  );
};

export default WalletConnectionProvider 