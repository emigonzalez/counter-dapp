import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getContract } from "thirdweb";

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

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!clientId) {
  throw new Error("No client ID provided");
}

if (!contractAddress) {
  throw new Error("No contract address provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({
  // the client you have created via `createThirdwebClient()`
  client,
  // the chain the contract is deployed on
  chain: myChain,
  // the contract's address
  address: contractAddress,
});