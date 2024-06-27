"use client"
import { ConnectButton, useReadContract, useSendTransaction } from "thirdweb/react";
import { client, contract } from "./client";
import { prepareContractCall } from "thirdweb";

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
          <CounterButton action="inc" label="Increment Counter" />
        </div>
        <div className="flex justify-center mb-5">
          <CounterButton action="dec" label="Decrement Counter" />
        </div>
        <div className="flex justify-center mb-5">
          <CounterButton action="reset" label="Reset Counter" />
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

const CounterButton = ({action, label}: {action:string,label:string}) => {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  
  const onClick = async () => {
    const transaction = prepareContractCall({
      contract,
      method: `function ${action}() public`,
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
          {label}
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
