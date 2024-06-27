## Solidity Counter DApp

### Requirements
Before you begin, you need to install the following tools:

- Node (>= v18.17)
- Yarn (v2+)
- Git

### 1. Run hardhat testnet

Run the testnet:

```bash
yarn install
yarn hardhat node
```
### 2. Set up Wallet && ThirdWeb
Don't forget to deploy the contract and setup the testnet in thirdweb.com.
You have to configure your wallet as well by adding the testnet and one test account with ETH.

```
- Chain ID: 31337
- Chain Name: hardhat
- RPC: "http://127.0.0.1:8545/"
- Currency Symbol: "ETH"
```

### 3. Deploy Contract

When you're ready to deploy your contracts, just run one of the following command to deploy you're contracts:

```bash
yarn thirdweb deploy
```

### 4. Set env vars

Create a .env file from .env.example and set client id and contract address from thirdweb.

NEXT_PUBLIC_TEMPLATE_CLIENT_ID=
NEXT_PUBLIC_CONTRACT_ADDRESS=

### 5. Run the DApp

To run the app, execute the followings commands:

```bash
cd thirdweb-app
yarn install
yarn dev
```

Test the app here: [http://localhost:3000/](http://localhost:3000/).
