require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const GEORLI_URL=process.env.GEORLI_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    georli:{
      url: GEORLI_URL,
      accounts: [PRIVATE_KEY]
    }
    
  }
};
