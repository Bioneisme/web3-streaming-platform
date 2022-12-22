const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");
dotenv.config();

const {MNEMONIC, ETH_PROJECT_ID} = process.env;

module.exports = {
    contracts_build_directory: path.join(__dirname, "/build"),
    networks: {
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
        goerli: {
            provider: () =>
                new HDWalletProvider(
                    {
                        mnemonic: {
                            phrase: MNEMONIC
                        },
                        providerOrUrl: ETH_PROJECT_ID,
                        numberOfAddresses: 1
                    }
                ),
            network_id: 5, // Goerli's id
            confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
            timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
        },
    },
    mocha: {
        // timeout: 100000
    },
    compilers: {
        solc: {
            version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
        }
    }
};
