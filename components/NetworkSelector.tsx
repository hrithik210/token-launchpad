'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { useNetwork } from '@/app/context/NetworkContext';


const NetworkSelector = () => {
  const { currentNetwork, setCurrentNetwork } = useNetwork();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          {currentNetwork} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setCurrentNetwork('devnet')}>
          Devnet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentNetwork('mainnet-beta')}>
          Mainnet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NetworkSelector;