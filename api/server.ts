import {CLIENT_URL, MNEMONIC, RPC, SERVER_PORT, STREAM_CONFIG} from "./config/settings";
import {config} from "./config/mikro-orm";
import logger from "./config/logger";
import userRoute from "./routes/userRoute";
import tokenRoute from "./routes/tokenRoute";
import cors from "cors";
import logging from "./middlewares/loggingMiddleware";
import express, {Application} from "express";
import cookieParser from "cookie-parser";
import {EntityManager, MikroORM} from "@mikro-orm/core";
import Web3 from "web3";
import artifacts from "../build/SoulBoundStreamToken.json";
import NodeMediaServer from "node-media-server";
import HDWalletProvider from "@truffle/hdwallet-provider";
// @ts-ignore
import contract from "truffle-contract";

const app: Application = express();

const web3 = new Web3(new HDWalletProvider(MNEMONIC, RPC) as any);
const LMS = contract(artifacts);

LMS.setProvider(web3.currentProvider);

// const nms = new NodeMediaServer(STREAM_CONFIG);
// nms.run();

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    lms: any,
    account: any,
    web3: Web3
};

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/token", tokenRoute);
app.use(logging);

app.listen(SERVER_PORT, async () => {
    DI.orm = await MikroORM.init(config);
    DI.em = DI.orm.em.fork();
    DI.lms = await LMS.deployed();
    DI.account = await web3.eth.accounts.create();
    DI.web3 = web3;

    logger.info(`Server Started on port ${SERVER_PORT}`);
});

