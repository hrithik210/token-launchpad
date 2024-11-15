"use client";

export function TokenLaunchpad() {
  return  <div  className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl mb-5 font-extrabold text-gray-900">Solana Token Launchpad</h1>
      <div className="flex flex-col max-w-lg mx-auto ">
        <input className='bg-slate-300 shadow-md rounded-md text-center' type='text' placeholder='Name'></input> <br />
        <input className='bg-slate-300 shadow-md rounded-md text-center' type='text' placeholder='Symbol'></input> <br />
        <input className='bg-slate-300 shadow-md rounded-md text-center' type={"file"} placeholder='Image URL'></input> <br />
        <input className='bg-slate-300 shadow-md rounded-md text-center' type='text' placeholder='Initial Supply'></input> <br />
        <button className='btn'>Create a token</button>
      </div>
      
  </div>
}