import {Router} from "express";
import authController from "../controllers/authController";
import {DI} from "../server";
import {INFURA_API_KEY, INFURA_PROJECT_ID} from "../config/settings";
import multer from "multer";
// @ts-ignore
import {create} from "ipfs-http-client";


const auth = 'Basic ' + Buffer.from(`${INFURA_PROJECT_ID}:${INFURA_API_KEY}`).toString('base64');

const ipfs = create({
    // host: 'ipfs.infura.io',
    // port: 5001, protocol: 'https',
    // headers: {
    //     authorization: auth
    // }
    url: "http://127.0.0.1:5001"
});

const upload = multer({dest: 'uploads/'});

const router: Router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/validate", authController.validate);

router.post("/test", upload.single('buffer'), async (req, res) => {
    try {
        let title = req.body.title
        const file = req.file;

        if (file && title) {
            let added = await ipfs.add(file);
            let hash = added.path
            DI.lms.sendIPFS(1, hash, {from: DI.accounts[0]})
            res.json({status: "success", hash: hash});
        } else {
            res.status(400).json({"status": "failed", "reason": "wrong input"})
        }
    } catch (e) {
        console.log(e)
    }
})
export default router;