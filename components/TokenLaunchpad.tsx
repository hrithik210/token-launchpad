"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

import { MINT_SIZE, 
  TOKEN_2022_PROGRAM_ID, createMintToInstruction, 
  createAssociatedTokenAccountInstruction, getMintLen, 
  createInitializeMetadataPointerInstruction, createInitializeMintInstruction, 
  TYPE_SIZE, LENGTH_SIZE, ExtensionType, mintTo, getOrCreateAssociatedTokenAccount, 
  getAssociatedTokenAddressSync
 } from "@solana/spl-token"

import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { toast } from "sonner";
import axios from "axios";


export default function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(9);
  const [initialSupply, setInitialSupply] = useState<number>(100);
  const [imageUrl, setImageUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { connection } = useConnection();
  console.log('Current Connection:', connection.rpcEndpoint);
  
  const wallet = useWallet();


  async function uploadMetadataToIPFS(metadata : any) {
      
      const PINATA_API_KEY = "ac9dd8d7c038835e4721";
      const PINATA_SECRET_KEY = "5effa5571c75fdcbb3a8f5857a5f0aee33ac0c9781224f7ce136509535e4e3a3";
  
      if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
        throw new Error("IPFS upload credentials not configured");
      }
  
     
      const tokenMetadata = {
          name: metadata.name,
          symbol: metadata.symbol,
          description: "This is an example fungible token for demonstration purposes.",
          image: imageUrl,
      };
  
      try {
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS", 
          tokenMetadata, 
          {
            headers: {
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_KEY,
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log('IPFS Upload Response:', `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
        return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      } catch (error) {
        console.error("IPFS Upload Error:", error);
        throw new Error("Failed to upload metadata");
      }
  }

  async function createToken() {
      if(!wallet.publicKey) { 
        return toast.error("Please connect your wallet to create a token"); 
      }
      setIsCreating(true);
      setError("");
      setSuccess("");

      // Validate inputs
      if (!name || !symbol) {
        setError("Name and symbol are required");
        setIsCreating(false);
        return;
      }

      if (decimals < 0 || decimals > 9) {
        setError("Decimals must be between 0 and 9");
        setIsCreating(false);
        return;
      }

      console.log('Current Connection:', connection.rpcEndpoint);
      console.log('Wallet Public Key:', wallet.publicKey?.toBase58());
      console.log('Wallet Balance:', await connection.getBalance(wallet.publicKey));

      try {
          const mintKeypair = Keypair.generate();
          
          const baseMetadata = {
            mint: mintKeypair.publicKey,
            name: name,
            symbol: symbol,
            decimals: Number(decimals),
            image: imageUrl,
            additionalMetadata: [],
          };

          const metadataUri = await uploadMetadataToIPFS(baseMetadata);
          const finalizedMetadata = { ...baseMetadata, uri: metadataUri };

          const mintLen = getMintLen([ExtensionType.MetadataPointer]);
          const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(finalizedMetadata).length;
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
                  decimals, 
                  wallet.publicKey, 
                  null, 
                  TOKEN_2022_PROGRAM_ID
              ),
              createInitializeInstruction({
                  programId: TOKEN_2022_PROGRAM_ID,
                  mint: mintKeypair.publicKey,
                  metadata: mintKeypair.publicKey,
                  name: finalizedMetadata.name,
                  symbol: finalizedMetadata.symbol,
                  uri: finalizedMetadata.uri,
                  mintAuthority: wallet.publicKey,
                  updateAuthority: wallet.publicKey,
              }),
          );
              
          transaction.feePayer = wallet.publicKey;
          transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
          transaction.partialSign(mintKeypair);

          await wallet.sendTransaction(transaction, connection);

          const associatedToken = getAssociatedTokenAddressSync(
              mintKeypair.publicKey,
              wallet.publicKey,
              false,
              TOKEN_2022_PROGRAM_ID,
          );

          const transaction2 = new Transaction().add(
              createAssociatedTokenAccountInstruction(
                  wallet.publicKey,
                  associatedToken,
                  wallet.publicKey,
                  mintKeypair.publicKey,
                  TOKEN_2022_PROGRAM_ID,
              ),
          );

          await wallet.sendTransaction(transaction2, connection);
          console.log('Associated Token Address:', associatedToken.toBase58());

          const adjustedInitialSupply = (initialSupply ?? 100) * (10 ** decimals);

          const transaction3 = new Transaction().add(
              createMintToInstruction(
                  mintKeypair.publicKey, 
                  associatedToken, 
                  wallet.publicKey, 
                  adjustedInitialSupply, 
                  [], 
                  TOKEN_2022_PROGRAM_ID
              )
          );

          await wallet.sendTransaction(transaction3, connection);

          console.log("token mint success:", mintKeypair.publicKey.toBase58());

          setSuccess(`Token ${symbol} created successfully!`);
          setIsCreating(false);
      } catch (err : any) {
          console.error(err);
          setError(err.message || "Token creation failed");
          setIsCreating(false);
      }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 min-h-screen">
      <div className="flex items-center justify-center flex-col mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-teal-100">Create Token</h2>
        <p className="text-gray-400 text-center">Launch your own Token on Solana</p>
      </div>

      {error && (
        <div className="bg-red-600/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-600/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 text-center">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Token Name *</label>
          <input
            type="text"
            placeholder="Enter token name"
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Token Symbol *</label>
          <input
            type="text"
            placeholder="Enter token symbol"
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Decimals (0-9)</label>
          <input
            type="number"
            placeholder="Token decimals"
            min="0"
            max="9"
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white"
            value={decimals}
            onChange={(e) => setDecimals(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Initial Supply</label>
          <input
            placeholder="Initial token supply"
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white"
            value={initialSupply}
            onChange={(e) => setInitialSupply(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Image URL (Optional)</label>
          <input
            type="url"
            placeholder="Token image URL"
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-gray-600 focus:border-teal-400 focus:outline-none text-white"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={createToken}
            disabled={isCreating || !wallet.connected}
            className={`
              w-full max-w-xs px-6 py-3 rounded-lg font-semibold transition-all duration-300
              ${isCreating || !wallet.connected
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-teal-600 hover:bg-teal-700 hover:scale-105'
              }
              text-white uppercase tracking-wider
            `}
          >
            {isCreating ? 'Creating...' : 'Create Token'}
          </button>
        </div>
      </div>

      {!wallet.connected && (
        <div className="text-center text-yellow-500 mt-4">
          Please connect your Solana wallet to create a token
        </div>
      )}
    </div>
  );
}