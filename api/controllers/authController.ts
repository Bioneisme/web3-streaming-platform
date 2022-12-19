import {NextFunction, Request, Response} from "express";
import {Users} from "../entities";
import {DI} from "../server";
import {compare, genSaltSync, hash} from "bcryptjs";
import {generateJWT, verifyJWT} from "../helpers/jwt";
import {UserRequest} from "../types";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({status: "error", message: "invalid_fields"});
            return next();
        }

        const user = await DI.em.findOne(Users, {email});

        if (!user) {
            res.status(404).json({status: 'error', message: 'user_not_found'});
            return next();
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({status: "error", message: "invalid_password"});
            return next();
        }

        res.status(200).send({...(user), token: generateJWT(user.id)});
        return next();
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const {email, login, password} = req.body;

        if (!email || !password || !login) {
            res.status(400).json({status: "error", message: "invalid_fields"});
            return next();
        }

        const existingUser = await DI.em.findOne(Users, {login});

        if (existingUser) {
            res.status(400).json({status: 'error', message: 'user_already_exists'});
            return next();
        }

        const slat = genSaltSync(10);
        const hashedPassword = await hash(password, slat);

        const user = DI.em.create(Users, {
            email,
            login,
            password: hashedPassword
        });

        await DI.em.persistAndFlush(user);

        if (!user) {
            res.status(500).json({status: "error", message: "cannot_create_user"});
            return next();
        }

        res.status(201).send({...user, token: generateJWT(user.id)});
        return next();
    }

    async validate(req: Request, res: Response, next: NextFunction) {
        const {token} = req.body;

        const decoded = verifyJWT(token);

        const id: number = (decoded as { id: number }).id;

        const user = await DI.em.findOne(Users, {id});
        if (!user) {
            res.status(404).json({status: 'error', message: 'user_not_found'});
            return next();
        }

        (req as UserRequest).user = user;

        res.status(200).json({...(user), token: generateJWT(user.id)});
        return next();
    }
}

export default new AuthController();