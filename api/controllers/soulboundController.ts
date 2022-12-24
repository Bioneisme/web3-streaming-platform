import {NextFunction, Request, Response} from "express";
import {IPFS, MAIN_ADDRESS} from "../config/settings";
import logger from "../config/logger";
import {DI} from "../server";

class SoulBoundController {
    async uploadSoulBound(req: Request, res: Response, next: NextFunction) {
        try {
            const obj = {
                "attributes" : [ {
                    "trait_type" : "NFT",
                    "value" : "Soulbound"
                }, {
                    "trait_type" : "Asset",
                    "value" : "Non-transferable Badge"
                }, {
                    "trait_type" : "Badge",
                    "value" : "Minting First Soulbound Token"
                }, {
                    "trait_type" : "Type",
                    "value" : "Demo"
                }   ],
                "description" : "This is a demo soulbound token mint",
                "image" : "https://gateway.pinata.cloud/ipfs/QmTY1jMAqabHUZFCj91ckwnCu3CPtJChpg345jdkxzj3ac",
                "name" : "Soulbound Token"
            }

            const added = await IPFS.add(JSON.stringify(obj));
            console.log(added);
            res.send(added);
            return next();
        } catch (e: any) {
            logger.error(`uploadSoulBound: ${e}`);
            res.status(400).json({status: 'error', message: e.message});
        }
    }

    async mintSoulBound(req: Request, res: Response, next: NextFunction) {
        try {
            const {address, url} = req.body;
            const result = await DI.st.safeMint(address, url, {from: MAIN_ADDRESS});
            res.send(result);
            return next();
        } catch (e: any) {
            logger.error(`mintSoulBound: ${e}`);
            res.status(400).json({status: 'error', message: e.message});
        }
    }
}

export default new SoulBoundController();