const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");
dotenv.config();

const {MNEMONIC, BSC_SCAN_API_KEY, RPC} = process.env;

module.exports = {
    contracts_build_directory: path.join(__dirname, "/build"),
    api_keys: {
        bscscan: BSC_SCAN_API_KEY
    },
    plugins: ['truffle-plugin-verify'],
    networks: {
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
        bsctest: {
            networkCheckTimeout: 20000,
            provider: () => new HDWalletProvider(MNEMONIC, RPC),
            network_id: 97,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        bsc: {
            networkCheckTimeout: 10000,
            provider: () => new HDWalletProvider(MNEMONIC, `https://bsc-dataseed1.binance.org`),
            network_id: 56,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true
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
