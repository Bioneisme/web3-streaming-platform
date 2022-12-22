import express, {Application} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {EntityManager, MikroORM} from "@mikro-orm/core";
import {CLIENT_URL, SERVER_PORT, STREAM_CONFIG} from "./config/settings";
import {config} from "./config/mikro-orm";
import logger from "./config/logger";
import logging from "./middlewares/loggingMiddleware";
import userRoute from "./routes/userRoute";
import Web3 from "web3";
// @ts-ignore
import contract from "truffle-contract";
import artifacts from "../build/StreamToken.json";
import NodeMediaServer from "node-media-server";
import tokenRoute from "./routes/tokenRoute";

const app: Application = express();

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const LMS = contract(artifacts);
LMS.setProvider(web3.currentProvider);

const nms = new NodeMediaServer(STREAM_CONFIG);
nms.run();

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    lms: any,
    accounts: any,
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
    DI.accounts = await web3.eth.getAccounts();
    DI.web3 = web3;

    logger.info(`Server Started on port ${SERVER_PORT}`);
});

