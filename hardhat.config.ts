require("dotenv").config({ path: __dirname + "/.env" });
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL ?? "",
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
  },
};

export default config;
