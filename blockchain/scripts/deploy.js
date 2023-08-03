// imports
const { ethers, network } = require("hardhat")

// deploy smart contract
async function main() {
  const contractFactory = await ethers.getContractFactory("SubscriptionService")

  console.log("Deploying contract please wait...")
  const deployedContract = await contractFactory.deploy("Netflix", 1)

  console.log(`Contract deployed to: ${deployedContract.address}`)
  console.log("Network configuration: ", network.config)

}

// call main and exit either will success or with error
main().then(() => process.exit(0)).catch((error) => {
  console.log(error)
  process.exit(1)
})