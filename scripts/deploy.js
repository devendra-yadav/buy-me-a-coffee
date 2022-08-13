const hre=require("hardhat")

async function main(){
  //deploy the contract
  const BuyMeACoffeeContractFactory=await hre.ethers.getContractFactory("BuyACoffee");
  const buyMeACoffee=BuyMeACoffeeContractFactory.deploy();
  (await buyMeACoffee).deployed();
  const contractAddress=(await buyMeACoffee).address;
  console.log(`Contract deployed at ${contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});