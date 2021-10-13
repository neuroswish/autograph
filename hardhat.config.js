require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-etherscan");

const dotenv = require('dotenv');
dotenv.config();
const { verify } = require("./deploy/verify");
task("verify-contracts", "Verifies the core contracts").setAction(verify);

const { RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;


module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {},
    mainnet: {
      url: RPC_ENDPOINT,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  typechain: {
    outDir: 'ts-types/contracts',
    target: 'ethers-v5'
  }
};
