import {NextFunction, Request, Response} from "express";
import {DI} from "../server";
import logger from "../config/logger";


class TokenController {
    async balanceOfAddress(req: Request, res: Response, next: NextFunction) {
        try {
            const address = req.params.address;
            const hex = await DI.lms.balanceOf(address);
            res.status(200).json({balance: hex.toString()});
            return next();
        } catch (e) {
            logger.error(`balanceOfAddress: ${e}`);
        }
    }

    async transferTo(req: Request, res: Response, next: NextFunction) {
        try {
            const {address, amount} = req.body;
            const result = await DI.lms.transfer(address, amount, {from: DI.accounts[0]});
            console.log(await DI.lms.getContractAddress())
            res.send(result)
            return next();
        } catch (e) {
            logger.error(`transferTo: ${e}`);
        }
    }
}

export default new TokenController();