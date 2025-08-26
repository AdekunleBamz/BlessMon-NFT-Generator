require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz",
      chainId: 10143,
      accounts: ["0x5df267fd6e370e395826236785055179745ed351a6398a2b5ff4c5855b5b27e2"]
    }
  }
};
