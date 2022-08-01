// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//get balance of an address
async function getBalance(address){
  
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  const [owner, sender1, sender2] = await hre.ethers.getSigners();
  //const balance=await getBalance(owner.address);
  console.log("get the addresses");
  console.log(`Owner : ${owner.address} : ${await getBalance(owner.address)}`);
  console.log(`Sender1 : ${sender1.address} : ${await getBalance(sender1.address)}`);
  console.log(`Sender2 : ${sender2.address} : ${await getBalance(sender2.address)}`);

  //deploy the contract
  console.log("going to deploy the contract");
  const BuyMeACoffeeContractFactory=await hre.ethers.getContractFactory("BuyACoffee");
  const buyMeACoffee=BuyMeACoffeeContractFactory.deploy();
  (await buyMeACoffee).deployed();
  console.log(`Contract deployed at ${(await buyMeACoffee).address}`);
  
  console.log(`Owner : ${owner.address} : ${await getBalance(owner.address)}`);
  console.log(`Sender1 : ${sender1.address} : ${await getBalance(sender1.address)}`);
  console.log(`Sender2 : ${sender2.address} : ${await getBalance(sender2.address)}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
