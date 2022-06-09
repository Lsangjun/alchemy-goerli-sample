const API_KEY = process.env.API_KEY; 
const PRIVATE_KEY = process.env.PRIVATE_KEY; 
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; 

const { ethers } = require("hardhat"); 
const userContractJson = require("../artifacts/contracts/UpdateMessage.sol/UpdateMessage.json"); 

// Provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider); 

// Create Contract Instance
const updateMessageContract = new ethers.Contract(CONTRACT_ADDRESS, userContractJson.abi, signer);

async function main() { 

    // before
    const message = await updateMessageContract.message(); 
    console.log(`Current message: '${message}'`); 

    // update
    const tx = await updateMessageContract.update("Updated Message!");  
    await tx.wait();

    // after
    const newMessage = await updateMessageContract.message(); 
    console.log(`Updated message: '${newMessage}'`); 
    
}

main()
	.then( () => process.exit(0) )
	.catch(error => { 
		console.log(error); 
		process.exit(1); 
	});