"use client";

import { createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint , MINT_SIZE } from "@solana/spl-token";
import { Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import type { ConfirmOptions, Connection, PublicKey, Signer } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export function TokenLaunchpad() {

    
  
  async function createToken(
      connection: Connection,
      payer: Signer,
      mintAuthority: PublicKey,
      freezeAuthority: PublicKey | null,
      decimals: number,
      keypair = Keypair.generate(),
      confirmOptions?: ConfirmOptions,
      programId = TOKEN_PROGRAM_ID,
  ) {
    createMint
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: keypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId,
      }),
      createInitializeMint2Instruction(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId),
  );

  await sendAndConfirmTransaction(connection, transaction, [payer, keypair], confirmOptions);
  }

  return (
  <div  className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl mb-5 font-extrabold text-white">Solana Token Launchpad</h1>
          <div className="flex flex-col max-w-lg mx-auto shadow-md ">
            <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type='text' placeholder='Name'></input> <br />
            <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type='text' placeholder='Symbol'></input> <br />
            <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type={"file"} placeholder='Image URL'></input> <br />
            <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type='text' placeholder='Initial Supply'></input> <br />
          </div>
          
        <button
          onClick={createToken} 
          className='bg-teal-500 py-2 px-3 shadow-md rounded-lg text-black text-lg font-semibold'>
          Create token
        </button>
      
  </div>
  );
}