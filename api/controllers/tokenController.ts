import {NextFunction, Request, Response} from "express";
import {DI} from "../server";
import logger from "../config/logger";
import {MAIN_ADDRESS} from "../config/settings";


class TokenController {
    async balanceOfAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const address = req.params.address;
            const hex = await DI.st.balanceOf(address);
            res.status(200).json({balance: hex.toString()});
            return next();
        } catch (e) {
            logger.error(`balanceOfAddress: ${e}`);
            res.status(400).json({status: 'error', message: e});
        }
    }

    async transferTo(req: Request, res: Response, next: NextFunction) {
        try {
            const {address, amount} = req.body;

            const result = await DI.st.transfer(address, amount * 0.0000000000000001, {from: MAIN_ADDRESS});
            res.send(result)
            return next();
        } catch (e: any) {
            logger.error(`transferTo: ${e}`);
            res.status(400).json({status: 'error', message: e.message});
        }
    }

    async getContractAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await DI.st.getContractAddress();
            res.send(result);
            return next();
        } catch (e: any) {
            logger.error(`getContractAddress: ${e}`);
            res.status(400).json({status: 'error', message: e.message});
        }
    }

    async claim(req: Request, res: Response, next: NextFunction) {
        try {
            const {address, amount} = req.body;
            const result = await DI.st.transfer(address, amount, {from: MAIN_ADDRESS});
            res.send(result);
            return next();
        } catch (e: any) {
            logger.error(`claim: ${e}`);
            res.status(400).json({status: 'error', message: e.message});
        }
    }
}

export default new TokenController();