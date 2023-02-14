const CONTRACT_ADDRESS = "0x4f3b36E99e37598DDF540add41Da23a931e6EcdA";
const royaltyReceiver = "0x445935FeD8Cb41749D5e8176e60c9D2484FABF01";
const feeNumerator = 250;

const GOLD = 0;
const SILVER = 1;
const SWORD = 2;
const SHIELD = 3;
const CROWN = 4;

async function contractFunction(contractAddress: string) {
  const ExampleNFT = await ethers.getContractFactory("V1Game");
  const [owner] = await ethers.getSigners();

  // const tx0 = await ExampleNFT.attach(contractAddress).setTokenRoyalty(
  //   GOLD,
  //   royaltyReceiver,
  //   feeNumerator
  // );
  // console.log(`(tx ${tx0.hash}) ...`);
  // await tx0.wait();
  // console.log(`success 🎉`);

  //   const tx0 = await ExampleNFT.attach(contractAddress).setDefaultRoyalty(
  //     royaltyReceiver,
  //     feeNumerator
  //   );
  //   console.log(`(tx ${tx0.hash}) ...`);
  //   await tx0.wait();
  //   console.log(`success 🎉`);
  // }

  // const tx0 = await ExampleNFT.attach(contractAddress).deleteDefaultRoyalty();
  // console.log(`(tx ${tx0.hash}) ...`);
  // await tx0.wait();
  // console.log(`success 🎉`);

  const tx0 = await ExampleNFT.attach(contractAddress).resetTokenRoyalty(GOLD);
  console.log(`(tx ${tx0.hash}) ...`);
  await tx0.wait();
  console.log(`success 🎉`);
}

contractFunction(CONTRACT_ADDRESS)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
