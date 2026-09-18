import UserService from "../../db/services/UserService";
import ValidationError from "../../utils/ValidationError";
import { ValidationMsgs } from "../../utils/constants";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";

export const register = async (req: Request, res: Response) => {
    try {
        const createdUser = await UserService.insertUserRecord(req.body);
        const user = await UserService.getUserById(createdUser._id.toString()).withBasicInfo().execute();
        const token = await UserService.authToken(createdUser);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        
        return res.status(200).json({ user, token });
    } catch (e: any) {
        return res.status(400).json({ error: e.message || e });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const createdUser = await UserService.findByCredentials(req.body.email, req.body.password)
            .withBasicInfo()
            .execute();
        const user = await UserService.getUserById(createdUser._id.toString()).withBasicInfo().execute();
        const token = await UserService.authToken(createdUser);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        
        return res.status(200).json({ user, token });
    } catch (e: any) {
        return res.status(400).json({ error: ValidationMsgs.UnableToLogin });
    }
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
    try {
        req.user.tokens = req.user.tokens.filter((token: any) => {
            return token.token !== req.token;
        });
        await req.user.save();
        
        res.clearCookie("token");
        
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (e: any) {
        return res.status(400).json({ error: e.message || e });
    }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        return res.status(200).json(req.user);
    } catch (e: any) {
        return res.status(400).json({ error: e.message || e });
    }
};
