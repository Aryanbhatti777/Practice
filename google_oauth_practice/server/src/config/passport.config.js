import passport from 'passport'
import { Strategy as googleStrategy } from 'passport-google-oauth20'
import userModel from '../models/user.model.js'
import config from './env.config.js'


passport.use(new googleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            return done(null, profile)
        } catch (error) {
            return done(err)
        }
    }
))

export default passport;