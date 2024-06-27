"use client"
import { ConnectButton, useReadContract, useSendTransaction } from "thirdweb/react";
import { client } from "./client";
import { getContract, prepareContractCall } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const myChain = defineChain({
  id: 31337,
  rpc: "http://127.0.0.1:8545/",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  testnet: true,
});

const contract = getContract({
  // the client you have created via `createThirdwebClient()`
  client,
  // the chain the contract is deployed on
  chain: myChain,
  // the contract's address
  address: "0x94B75AA39bEC4cB15e7B9593C315aF203B7B847f",
});

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
        </div>
        <div className="flex justify-center mb-20">
          <div className="flex items-center bg-blue-500 text-white text-sm font-bold py-3 px-4 rounded " role="alert">
            <Counter />
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <IncrementCounter />
        </div>
        <div className="flex justify-center mb-5">
          <DecrementCounter />
        </div>
        <div className="flex justify-center mb-5">
          <ResetCounter />
        </div>
      </div>
    </main>
  );
}

const Counter = () => {
  const { data, isLoading } = useReadContract({
    contract,
    method: "function get() public view returns (uint256)",
    params: [],
  });

  return !isLoading ? (
      <p>Counter: {data?.toString()}</p>
  ) : (
    <Spinner color="white"/>
  )
};

const IncrementCounter = () => {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  
  const onClick = async () => {
    const transaction = prepareContractCall({
      contract,
      method: "function inc() public",
      params: [],
    });
    sendTransaction(transaction);
  };

  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? 
        <span>
          <Spinner color="gray-800"/>
          Please confirm transaction in your wallet.
        </span>
        :
        <span>
          Increment Counter
        </span>
      }
    </button>
  )
};

const DecrementCounter = () => {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  
  const onClick = async () => {
    const transaction = prepareContractCall({
      contract,
      method: "function dec() public",
      params: [],
    });
    sendTransaction(transaction);
  };

  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? 
        <span>
          <Spinner color="gray-800"/>
          Please confirm transaction in your wallet.
        </span>
        :
        <span>
          Decrement Counter
        </span>
      }
    </button>
  )
};

const ResetCounter = () => {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  
  const onClick = async () => {
    const transaction = prepareContractCall({
      contract,
      method: "function reset() public",
      params: [],
    });
    sendTransaction(transaction);
  };

  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? 
        <span>
          <Spinner color="gray-800"/>
          Please confirm transaction in your wallet.
        </span>
        :
        <span>
          Reset Counter
        </span>
      }
    </button>
  )
};

const Spinner = ({color}:{color:string}) => (
  <svg className={`animate-spin h-5 w-5 mr-3 text-${color}`} viewBox="0 0 24 24"></svg>
);

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Solidity Counter
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
      </h1>
    </header>
  );
}
