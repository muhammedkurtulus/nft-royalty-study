import { ethers } from "hardhat";

const contractAddress = "0xeC96A0527708632111DE92F3cdE79918D5237Bc4";
const receiver = "0x445935FeD8Cb41749D5e8176e60c9D2484FABF01";

const GOLD = 0;
const SILVER = 1;
const SWORD = 2;
const SHIELD = 3;
const CROWN = 4;

const amountGOLD = 100;
const amountSILVER = 100;
const amountSWORD = 5;
const amountSHIELD = 5;
const amountCROWN = 1;

const mintItems = async (contract: any) => {
  const tx0 = await contract
    .attach(contractAddress)
    .mint(receiver, GOLD, amountGOLD);
  console.log(
    `minting token ${GOLD} with initial supply of ${amountGOLD} (tx ${tx0.hash}) ...`
  );
  await tx0.wait();
  console.log(`Mint GOLD success 🎉`);

  const tx1 = await contract
    .attach(contractAddress)
    .mint(receiver, SILVER, amountSILVER);
  console.log(
    `minting token ${SILVER} with initial supply of ${amountSILVER} (tx ${tx1.hash}) ...`
  );
  await tx1.wait();
  console.log(`Mint SILVER success 🎉`);

  const tx2 = await contract
    .attach(contractAddress)
    .mint(receiver, SWORD, amountSWORD);
  console.log(
    `minting token ${SWORD} with initial supply of ${amountSWORD} (tx ${tx2.hash}) ...`
  );
  await tx2.wait();
  console.log(`Mint SWORD success 🎉`);

  const tx3 = await contract
    .attach(contractAddress)
    .mint(receiver, SHIELD, amountSHIELD);
  console.log(
    `minting token ${SHIELD} with initial supply of ${amountSHIELD} (tx ${tx3.hash}) ...`
  );
  await tx3.wait();
  console.log(`Mint SHIELD success 🎉`);

  const tx4 = await contract
    .attach(contractAddress)
    .mint(receiver, CROWN, amountCROWN);
  console.log(
    `minting token ${CROWN} with initial supply of ${amountCROWN} (tx ${tx4.hash})`
  );
  await tx4.wait();
  console.log(`Mint CROWN success 🎉`);
};

async function contractFunction() {
  const ExampleNFT = await ethers.getContractFactory("MultiRoyalty");
  const [owner] = await ethers.getSigners();

  const tx1 = await ExampleNFT.attach(contractAddress).setTokenRoyalty(
    SILVER,
    owner.address,
    500
  );
  console.log(`(tx ${tx1.hash}) ...`);
  await tx1.wait();
  console.log(`success 🎉`);

  const tx0 = await ExampleNFT.attach(contractAddress).setDefaultRoyalty(
    owner.address,
    250
  );
  console.log(`(tx ${tx0.hash}) ...`);
  await tx0.wait();
  console.log(`success 🎉`);

  //   const tx2 = await ExampleNFT.attach(contractAddress).setTokenRoyalty(
  //     SWORD,
  //     owner.address,
  //     250
  //   );
  //   console.log(`(tx ${tx2.hash}) ...`);
  //   await tx2.wait();
  //   console.log(`success 🎉`);

  await mintItems(ExampleNFT);
}

contractFunction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
