const hre = require("hardhat");

async function main() {
  console.log("Deploying BlessedMonNFT contract to Monad testnet...");
  
  const BlessedMonNFT = await hre.ethers.getContractFactory("BlessedMonNFT");
  const nftContract = await BlessedMonNFT.deploy();
  
  await nftContract.waitForDeployment();
  
  const contractAddress = await nftContract.getAddress();
  
  console.log("BlessedMonNFT deployed to:", contractAddress);
  console.log("Transaction hash:", nftContract.deploymentTransaction().hash);
  console.log("Block explorer:", `https://testnet.monadexplorer.com/address/${contractAddress}`);
  
  return contractAddress;
}

main()
  .then((contractAddress) => {
    console.log("Deployment successful!");
    console.log("Contract address:", contractAddress);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
