'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

type Network = 'devnet' | 'testnet' | 'mainnet-beta'

interface NetworkContextType {

  currentNetwork: Network;

  setCurrentNetwork: (network: Network) => void;

}


const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [currentNetwork, setCurrentNetwork] = useState<Network>('devnet')

  useEffect(() => {
    const initialNetwork = process.env.NEXT_PUBLIC_SOLANA_NETWORK as Network || 'devnet'
    setCurrentNetwork(initialNetwork)
  }, [])


  return (
    <NetworkContext.Provider value={{ currentNetwork, setCurrentNetwork}}>
      {children}
    </NetworkContext.Provider>
  )
}

export function useNetwork() {
  const context = useContext(NetworkContext)
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider')
  }
  return context
}