## Getting Started
### Prerequisites
You will need metamask wallet and alchemy account.
- [metamask](https://metamask.io/)
- [alchemy](https://www.alchemy.com/)

### Installation
```sh
npm -y init

npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
npm install --save-dev hardhat

npm install dotenv --save
```

## Deploying Smart Contract
### Set up hardhat
Hardhat is Ethereum development environment. It lets you compile your contracts and run them on a development network.
We will deploy simple smart contract to Goerli Ethereum Testnet. 
- Start hardhat project and select 'Create an empty hardhat.config.js' 
```sh
npx hardhat
```
Add API_URL, API_KEY, WALLET_PRIVATE_KEY to ```.env``` 
```plain
API_URL = ""
API_KEY = ""
PRIVATE_KEY = ""
```
```hardhat.config.js``` - Set up hardhat
```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config(); 
require("@nomiclabs/hardhat-ethers"); 

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli", 
  networks: {
    hardhat: {}, 
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
```
### Sample Smart Contract
Let's write simple smart contract example that lets you update message on smart contract. 
```solidity
// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.3;

contract UpdateMessage {

    string public message; 

    constructor(string memory initMessage) {
        message = initMessage; 
    }

    function update(string memory newMessage) public {
        message = newMessage; 
    }

}
```

### Script for deployment and deploy
```deploy.js``` - Script for sample deployment
```javascript
const { ethers } = require("hardhat");

async function main() { 
    
    // deployed to address 0xbaD425d09851f0a5676CFF6F149AFc60995000A9
    const getContract = await ethers.getContractFactory("UpdateMessage"); 
    const updateMessage = await getContract.deploy("Hello World!"); 
    console.log("Contract successfully deployed to address: " + updateMessage.address); 

}

main() 
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error); 
        process.exit(1); 
    }); 
```

Deploy using script above and make sure you specify network that contract is deploying to.
```sh
npx hardhat run scripts/deploy.js --network goerli
```

## Interact with deployed smart contract
For full script please reference ```interact.js```

With contract address and abi, we can directly interact with the smart contract. We need a Ethereum Node Provider, in this case, *Alchemy*, and signer, which is user(wallet) in this case. 
```javascript
// provider - Alchemy
const provider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
// signer - Wallet private key with provider entry point
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
// contract instance 
const contractJSON = require("../artifacts/contracts/UpdateMessage.sol/UpdateMessage.json");
const contract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
```
After the set up, we can directly communicate with variables and functions in smart contract. 
```javascript
// read variable
const message = await contract.message(); 
// call function
const tx = await contract.update("Update Message!"); 
await tx.wait(); 
```
Run ```interact.js``` script to execute transaction.
```sh
npx hardhat run scripts/interact.js --network goerli
```

## Verification
To verify contract on Etherscan you will first need to deploy as explained above. 

Install hardhat-etherscan plug-in and add it to ```hardhat.config.js``` You will also need etherscan api key, which you can get it from etherscan; Add api key to ```.env```
```sh
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Checkout full file from ```hardhat.config.js```
```javascript
...

require("@nomiclabs/hardhat-etherscan");

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; 

module.export = {
    ...
    // add setting for etherscan
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    }
};
```

- Verifying
```sh
npx hardhat verify --network goerli <CONTRACT_ADDRESS> <CONTRACT_CONSTRUCTOR_PARAMETER>

# Example 
npx hardhat verify --network 0xbaD425d09851f0a5676CFF6F149AFc60995000A9 'Hello World!' 
```

You can checkout verifed contract on Etherscan. If contract is verifed you could directly read and write to the contract on Etherscan by connecting your wallet. 