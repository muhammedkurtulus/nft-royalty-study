import { ethers } from "hardhat";
const feeNumerator = 500;

async function main() {
  console.log((await ethers.getSigners()).map((s) => s.address));

  const deployer = (await ethers.getSigners())[0];

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("MultiRoyalty"); //Replace with name of your smart contract
  const token = await Token.connect(deployer).deploy();
  // const token = await Token.deploy(feeNumerator);
  // const token = await Token.deploy();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
