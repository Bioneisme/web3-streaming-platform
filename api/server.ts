import express, {Application} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {EntityManager, MikroORM} from "@mikro-orm/core";
import {CLIENT_URL, SERVER_PORT} from "./config/settings";
import {config} from "./config/mikro-orm";
import logger from "./config/logger";
import logging from "./middlewares/loggingMiddleware";
import userRoute from "./routes/userRoute";

const app: Application = express();

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager
};

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use(logging);

app.listen(SERVER_PORT, async () => {
    DI.orm = await MikroORM.init(config);
    DI.em = DI.orm.em.fork();

    logger.info(`Server Started on port ${SERVER_PORT}`);
});

