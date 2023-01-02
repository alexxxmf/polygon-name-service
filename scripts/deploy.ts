import { ethers } from "hardhat";

const main = async () => {
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("based");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("gigachad", {
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain gigachad.based");

  txn = await domainContract.setRecord("gigachad", "This is super based");
  await txn.wait();
  console.log("Set record for gigachad.based");

  const address = await domainContract.getAddress("gigachad");
  console.log("Owner of domain gigachad:", address);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
