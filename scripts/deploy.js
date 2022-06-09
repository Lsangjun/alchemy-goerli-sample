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