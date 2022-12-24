import {NextFunction, Request, Response} from "express";
import {IPFS, MAIN_ADDRESS} from "../config/settings";
import logger from "../config/logger";
import {DI} from "../server";

class SoulBoundController {
    async mintSoulBound(req: Request, res: Response, next: NextFunction) {
        try {
            const {address, type} = req.body;
            let obj;
            switch (type) {
                case 'time': {
                    obj = {
                        "attributes": [{
                            "trait_type": "NFT",
                            "value": "SoulBound"
                        }, {
                            "trait_type": "Asset",
                            "value": "Non-transferable Badge"
                        },
                        ],
                        "description": "For the time spent on the platform",
                        "image": "https://gateway.pinata.cloud/ipfs/QmYPja3BDqB63tY7b27ySuXpP4L5iCadDCt9Ko7b3bQAJy",
                        "name": "SoulBound Time Token"
                    }
                    break;
                }
                case 'streaming': {
                    obj = {
                        "attributes": [{
                            "trait_type": "NFT",
                            "value": "SoulBound"
                        }, {
                            "trait_type": "Asset",
                            "value": "Non-transferable Badge"
                        },
                        ],
                        "description": "For regular streaming",
                        "image": "https://gateway.pinata.cloud/ipfs/QmczrdN5VbcwY16BWjvSbaAyZadsBy9X32R4H8QncFQqQW",
                        "name": "SoulBound Streaming Token"
                    }
                    break;
                }
                default: {
                    res.status(400).send({status: 'error', message: 'Wrong type'});
                }
            }

            const url = await IPFS.add(JSON.stringify(obj));
            const result = await DI.sbt.safeMint(address, `https://ipfs.io/ipfs/${url.path}`, {from: MAIN_ADDRESS});
            res.send(result);
            return next();
        } catch (e: any) {
            logger.error(`mintSoulBound: ${e}`);
            res.status(400).json({status: 'error', message: e.message});
        }
    }
}

export default new SoulBoundController();