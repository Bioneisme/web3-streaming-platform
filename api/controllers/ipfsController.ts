import {NextFunction, Request, Response} from "express";
import logger from "../config/logger";
import {IPFS} from "../config/settings";
import * as fs from "fs";

class IpfsController {
    async uploadUserData(req: Request, res: Response, next: NextFunction) {
        try {
            const {username} = req.body;

        } catch (e) {
            logger.error(`uploadUserData: ${e}`);
            res.status(400).json({status: 'error', message: e});
        }
    }

    async uploadStreamData(req: Request, res: Response, next: NextFunction) {
        try {
            const {streamId, streamName, streamCategory, streamDescription, authorAddress} = req.body;
            const obj = {streamId, streamCategory, streamDescription, streamName, authorAddress};
            const result = await IPFS.add(JSON.stringify(obj));
            res.send(result);
            fs.readFile('./api/hash.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    const newObj = JSON.parse(data);
                    newObj.streams.push(result.path);
                    const json = JSON.stringify(newObj);
                    fs.writeFile('./api/hash.json', json, 'utf8', function (err) {
                        console.log(err)
                    });
                }});
            return next();
        } catch (e) {
            logger.error(`uploadStreamData: ${e}`);
            res.status(400).json({status: 'error', message: e});
        }
    }

    async getStreams(req: Request, res: Response, next: NextFunction) {
        try {
            fs.readFile("./api/hash.json", "utf8", async (err, jsonString) => {
                const streams: any[] = [];

                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                const hashes = JSON.parse(jsonString).streams;
                for (const item of hashes) {
                    try {
                        const t = await IPFS.get(item)
                        let contents = "";
                        for await(const item of t) {
                            contents += new TextDecoder().decode(item)
                        }
                        contents = contents.replace(/\0/g, '');
                        const content = contents.split("0ustar0000000000000000")[1]
                        streams.push(JSON.parse(content));
                    } catch (e) {
                        console.log(e);
                    }
                }
                res.status(200).send(streams);
                return next();
            });
        } catch (e) {
            logger.error(`getStreams: ${e}`);
            res.status(400).json({status: 'error', message: e});
        }
    }
}

export default new IpfsController();