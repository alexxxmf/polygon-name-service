import { ethers } from "hardhat";

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("based");
  await domainContract.deployed();
  console.log("Contract owner:", owner.address);

  let txn = await domainContract.register("a16z", {
    value: ethers.utils.parseEther("1234"),
  });
  await txn.wait();

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));

  try {
    txn = await domainContract.connect(randomPerson).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("Could not rob contract");
  }

  let ownerBalance = await ethers.provider.getBalance(owner.address);
  console.log(
    "Balance of owner before withdrawal:",
    ethers.utils.formatEther(ownerBalance)
  );

  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  const contractBalance = await ethers.provider.getBalance(
    domainContract.address
  );
  ownerBalance = await ethers.provider.getBalance(owner.address);

  console.log(
    "Contract balance after withdrawal:",
    ethers.utils.formatEther(contractBalance)
  );
  console.log(
    "Balance of owner after withdrawal:",
    ethers.utils.formatEther(ownerBalance)
  );
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
