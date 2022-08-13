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

async function printBalances(addressList){
  for(let i=0;i<addressList.length;i++){
    console.log(`Address : ${addressList[i].address} : ${await getBalance(addressList[i].address)}`);
 }
}

async function main() {
  const [owner, sender1, sender2, sender3] = await hre.ethers.getSigners();
  const addresses=[owner, sender1, sender2, sender3];
  //const balance=await getBalance(owner.address);

  console.log("Initial ETH Balances");
  await printBalances(addresses);

  console.log("going to deploy the contract");
  const buyMeACoffeeContract=await deployContract("BuyACoffee");
  console.log(`Contract address ${buyMeACoffeeContract.address}`);
  
  console.log("ETH Balances after contract deployment");
  await printBalances(addresses);
  console.log(`Contract balance : ${await getBalance(buyMeACoffeeContract.address)}`);

  //buy coffee
  const tip={"value" : hre.ethers.utils.parseEther("0.5")};

  await buyCoffee(buyMeACoffeeContract, sender1, tip, "Devendra", "Hi there. appreciate your work" );
  await buyCoffee(buyMeACoffeeContract, sender2, tip, "Sandeep", "Good luck buddy!!" );
  await buyCoffee(buyMeACoffeeContract, sender3, tip, "Ayushi", "Best of luck for your new project ~~~~" );

  await printBalances(addresses);
  console.log(`Contract balance : ${await getBalance(buyMeACoffeeContract.address)}`);

  //withdraw tips
  await withdrawTips(buyMeACoffeeContract, owner);
  console.log("ETH balance after withdrawl");
  await printBalances(addresses);
  console.log(`Contract balance : ${await getBalance(buyMeACoffeeContract.address)}`);

  //read all memos
  await showAllMemos(buyMeACoffeeContract, sender1);

}


//Deploy contract
async function deployContract(contractName){
  //deploy the contract
  
  const BuyMeACoffeeContractFactory=await hre.ethers.getContractFactory(contractName);
  const buyMeACoffee=BuyMeACoffeeContractFactory.deploy();
  (await buyMeACoffee).deployed();
  const contractAddress=(await buyMeACoffee).address;
  
  return buyMeACoffee;
}

//Send tip for coffee
async function buyCoffee(buyCoffeeContract, sender, amount, name, message){
  await buyCoffeeContract.connect(sender).buyCoffee(name,message, amount);
}

//withdraw tips
async function withdrawTips(buyCoffeeContract, owner){
  await buyCoffeeContract.connect(owner).withdrawTips();
}

async function showAllMemos(buyCoffeeContract, requesterAddress){
  const allMemos = await buyCoffeeContract.connect(requesterAddress).getAllMemos();
  console.log("Total Memos : "+allMemos.length);
  for(const memo of allMemos){
    const timestamp = memo.timestamp;
    const senderAddress = memo.sender;
    const name = memo.name;
    const message = memo.message;
    console.log(`At ${timestamp} ${name} (${senderAddress}) said ${message}`);
  }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
