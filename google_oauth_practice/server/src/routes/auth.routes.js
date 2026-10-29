import Router from 'express';
import passport from '../config/passport.config.js'
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import config from '../config/env.config.js';
const authRouter = Router();

authRouter.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    session: false
}));

authRouter.get("/google/callback",
    passport.authenticate('google', {
        session: false,
        failureRedirect: "/"
    }), 
    async (req, res) => {
        const user = req.user;
        const email = user.emails[0].value;
        
        const isExist = await userModel.findOne({ email });

        if (isExist) {
            const accessToken = jwt.sign(email, config.JWT_SECRET);
            return res.status(200).json({
                accessToken
            })
        }

        const newUser = await userModel.create({
            name: user.displayName,
            email,
            googleId: user.id
        })

        const token = jwt.sign(email, config.JWT_SECRET);
        return res.status(201).json({
            newUser,
            token
        })
    }
)

export default authRouter;