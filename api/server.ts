import {CLIENT_URL, MNEMONIC, RPC, SERVER_PORT, STREAM_CONFIG} from "./config/settings";
import logger from "./config/logger";
import tokenRoute from "./routes/tokenRoute";
import soulBoundRoute from "./routes/soulboundRoute";
import ipfsRoute from "./routes/ipfsRoute";
import cors from "cors";
import logging from "./middlewares/loggingMiddleware";
import express, {Application} from "express";
import cookieParser from "cookie-parser";
import Web3 from "web3";
import SoulBoundToken from "../build/SoulBoundStreamToken.json";
import StreamToken from "../build/StreamToken.json";
import HDWalletProvider from "@truffle/hdwallet-provider";
// @ts-ignore
import contract from "truffle-contract";

const app: Application = express();

const web3 = new Web3(new HDWalletProvider(MNEMONIC, RPC) as any);
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const SBT = contract(SoulBoundToken);
const ST = contract(StreamToken);

SBT.setProvider(web3.currentProvider);
ST.setProvider(web3.currentProvider);

export const DI = {} as {
    st: any,
    sbt: any,
    account: any,
    web3: Web3
};

app.use(express.json());
app.use(cors({
    credentials: true
}));
app.use(cookieParser());

app.use("/api/ipfs", ipfsRoute);
app.use("/api/token", tokenRoute);
app.use("/api/nft", soulBoundRoute);

app.use(logging);

app.listen(SERVER_PORT, async () => {
    DI.sbt = await SBT.deployed();
    DI.st = await ST.deployed();
    DI.account = await web3.eth.accounts.create();
    DI.web3 = web3;

    logger.info(`Server Started on port ${SERVER_PORT}`);
});

