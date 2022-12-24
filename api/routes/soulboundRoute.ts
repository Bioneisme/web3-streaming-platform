import router from "./tokenRoute";
import soulBoundController from "../controllers/soulboundController";

router.get("/uploadSoulBound", soulBoundController.uploadSoulBound);

router.post("/mintSoulBound", soulBoundController.mintSoulBound);

export default router;