/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config(); 
require("@nomiclabs/hardhat-ethers"); 
require("@nomiclabs/hardhat-etherscan");

const API = process.env.API
const API_URL = process.env.API_URL; 
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;  

module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {},
    goerli: { 
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }, 
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
