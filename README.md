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
- Add API_URL, API_KEY, WALLET_PRIVATE_KEY to .env
```plain
API_URL = ""
API_KEY = ""
PRIVATE_KEY = ""
```
- Set up hardhat
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
- Script
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

- Deploy using script

Make sure you specify network you are deploying contract to
```sh
npx hardhat run scripts/deploy.js --network goerli
```
