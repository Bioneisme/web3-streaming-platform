import {Router} from "express";
import ipfsController from "../controllers/ipfsController";

const router: Router = Router();

router.get("/uploadUserData", ipfsController.uploadUserData);
router.post("/uploadStreamData", ipfsController.uploadStreamData);
router.get("/getStreams", ipfsController.getStreams);

export default router;