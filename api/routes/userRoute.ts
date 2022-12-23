import {Router} from "express";
import authController from "../controllers/authController";
import {INFURA_API_KEY, INFURA_PROJECT_ID} from "../config/settings";
import multer from "multer";
import {create} from "ipfs-http-client";

const upload = multer({dest: 'uploads/'});

const router: Router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/validate", authController.validate);

// router.post("/test", upload.single('buffer'), async (req, res) => {
//     try {
//         let title = req.body.title
//         const file = req.file;
//
//         if (file && title) {
//             let added = await ipfs.add(file);
//             let hash = added.path
//             res.json({status: "success", hash: hash});
//         } else {
//             res.status(400).json({"status": "failed", "reason": "wrong input"})
//         }
//     } catch (e) {
//         console.log(e)
//     }
// })
export default router;