## Solidity Counter DApp

### Requriements
Before you begin, you need to install the following tools:

- Node (>= v18.17)
- Yarn (v2+)
- Git

### Run hardhat testnet

First, run the testnet:

```bash
yarn install
yarn hardhat node
```

Don't forget to deploy the contract and setup the testnet in thirdweb.com.
You have to configure your wallet as well by adding the testnet and one test account with ETH.

### Deploy Contract

When you're ready to deploy your contracts, just run one of the following command to deploy you're contracts:

```bash
yarn thirdweb deploy
```

### Run the DApp

To run the app, execute the followings commands:

```bash
cd thirdweb-app
yarn install
yarn dev
```

Test the app here: [http://localhost:3000/](http://localhost:3000/).
