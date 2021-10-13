const { ethers } = require("hardhat");
const { BigNumber } = ethers;
const fs = require("fs");
const dotenv = require('dotenv');

const GAS_PRICE = "70000000000";

// EXECUTE
deployAutograph()
    .then(() => {
        console.log("DONE");
        process.exit(0);
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    });

// LOAD ENV VARIABLES
function loadEnv() {
  dotenv.config();
  const {CHAIN_NAME, RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY} = process.env;
  if (!(CHAIN_NAME && RPC_ENDPOINT && DEPLOYER_PRIVATE_KEY)) {
      throw new Error("Must populate all values in .env");
  }
  return {CHAIN_NAME, RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY};
}

// GET DEPLOYER
function getDeployer(RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY) {
  const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
  const deployer = new ethers.Wallet(`0x${DEPLOYER_PRIVATE_KEY}`, provider);
  return deployer;
}


// DEPLOY GENERAL CONTRACT
async function deploy(wallet, name, args = []) {
  const Implementation = await ethers.getContractFactory(name, wallet);
  const contract = await Implementation.deploy(...args, {
      gasPrice: BigNumber.from(GAS_PRICE),
  });
  return contract.deployed();
}

// DEPLOY Autograph
async function deployAutograph() {
  // load .env
  const {CHAIN_NAME, RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY} = loadEnv();

  // set up deployer wallet
  const deployer = getDeployer(RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY);

  // deploy Autograph
  console.log('Deploy Autograph');
  const autograph = await deploy(deployer, 'Autograph');
  console.log(`Deployed Autograph Contract to ${CHAIN_NAME}: `, autograph.address);

}