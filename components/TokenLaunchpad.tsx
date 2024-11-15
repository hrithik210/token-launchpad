"use client";

export function TokenLaunchpad() {
  return  <div  className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl mb-5 font-extrabold text-white">Solana Token Launchpad</h1>
      <div className="flex flex-col max-w-lg mx-auto shadow-md ">
        <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type='text' placeholder='Name'></input> <br />
        <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type='text' placeholder='Symbol'></input> <br />
        <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type={"file"} placeholder='Image URL'></input> <br />
        <input className='bg-slate-200 shadow-md rounded-md text-center px-5 py-3 text-black' type='text' placeholder='Initial Supply'></input> <br />
      </div>
      <button className='bg-teal-500 py-2 px-3 shadow-md rounded-lg text-black text-lg font-semibold'>Create token</button>
      
  </div>
}