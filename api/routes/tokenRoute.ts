import {Router} from "express";
import tokenController from "../controllers/tokenController";

const router: Router = Router();

router.get("/balanceOfAddress/:address", tokenController.balanceOfAddress);

router.post("/transferTo", tokenController.transferTo);

router.get("/getContractAddress", tokenController.getContractAddress);

router.get("/uploadSoulBound", tokenController.uploadSoulBound);

router.post("/mintSoulBound", tokenController.mintSoulBound);

export default router;