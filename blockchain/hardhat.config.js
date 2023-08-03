require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config()

require("solidity-coverage");

// Ganache network config values
const ganache_url = process.env.GANACHE_URL;
const pk = process.env.PRIVATE_KEY;

//get coinmarketcap api key from .env for configuration of gas-reporter
const coinmarketcap_api_key = process.env.COIN_MARKET_CAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: 'GBP',
    coinmarketcap: coinmarketcap_api_key,
  },
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: ganache_url,
      accounts: [pk],
      chainId: 1337
    }
  }
};
