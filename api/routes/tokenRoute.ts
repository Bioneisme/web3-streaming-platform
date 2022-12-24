import {Router} from "express";
import tokenController from "../controllers/tokenController";

const router: Router = Router();

router.get("/balanceOfAddress/:address", tokenController.balanceOfAddress);

router.post("/transferTo", tokenController.transferTo);

router.get("/getContractAddress", tokenController.getContractAddress);

export default router;