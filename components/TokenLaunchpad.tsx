"use client";

import {
  Keypair,
  SystemProgram,
  Transaction,
  Connection,
} from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  createInitializeMintInstruction,
  createInitializeMetadataPointerInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType
} from "@solana/spl-token";
import {useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";

export function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [fileName, setFileName] = useState("");
  const [mintAddress, setMintAddress] = useState<string | null>(null);

  const handleFileChange = (e :any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const wallet = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");

  async function createToken() {
    if (!wallet.publicKey) {
      throw new Error("Wallet not connected");
    }
    const mintKeypair = Keypair.generate();

    const metadata = {
      mint: mintKeypair.publicKey,
      name: name || "KIRA",
      symbol: symbol || "KIR",
      uri: "",
      additionalMetadata: [],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
   
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),

    
      createInitializeMetadataPointerInstruction(
        mintKeypair.publicKey,
        wallet.publicKey,
        mintKeypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),

      createInitializeMintInstruction(
        mintKeypair.publicKey,
        parseInt(decimals),
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),

    
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        metadata: mintKeypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      })
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(mintKeypair);

    await wallet.sendTransaction(transaction, connection);
    console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl mb-5 font-extrabold text-white">
        Solana Token Launchpad
      </h1>
      <div className="flex flex-col max-w-lg mx-auto shadow-md gap-2 mb-5">
        <Input
          placeholder="Enter token name"
          className="bg-black text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Symbol"
          className="bg-black text-white"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <Input
          placeholder="decimals"
          className="bg-black text-white"
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
        />
        <Input
          placeholder="Initial Supply"
          className="bg-black text-white"
          type="number"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
        />
        <label className="block w-full px-5 py-3 text-center bg-white text-black rounded-lg shadow-md cursor-pointer hover:bg-gray-500">
          <span className="flex text-lg font-medium gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>
            {fileName ? (
              <p className="text-green-600 truncate">{fileName}</p>
            ) : (
              <p>Upload Image</p>
            )}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <button
        onClick={createToken}
        className="bg-teal-500 py-2 px-3 shadow-md rounded-lg text-black text-lg font-semibold"
      >
        Create token
      </button>

      {mintAddress && (
        <div className="mt-5">
          <p className="text-green-400 font-semibold">Token Mint Address:</p>
          <a
            href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline break-all"
          >
            {mintAddress}
          </a>
        </div>
      )}
    </div>
  );
}
