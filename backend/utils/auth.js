const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const { secret, expiresIn } = jwtConfig;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8888/api/session/google/redirect',
    scope: ['profile', 'email']
},
    async function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile)
        const credential = profile.emails[0].values
        console.log(credential, profile.emails[0])
        const [user, created] = await User.findOrCreate({
            where: { email: credential },
            defaults: {
                name: profile.name.givenName,
                hashedPw: bcrypt.hashSync(crypto.randomBytes(4).toString('hex'))
            }
        })
        if (created) return done(null, user)
        return done(null, profile)

    }))


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.findByPk(id, {
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt']
                }
            });
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}

const validateLogin = function (req, res, next) {
    const { credential, password } = req.body
    errors = {}
    if (credential.length < 1) {
        errors['emailLength'] = 'Enter a valid email'
    }
    if (password.length < 1) {
        errors['password'] = 'Please provide a password'
    }
    if (Object.values(errors).length) return res.status(400).json(errors)
    else return next()
}

module.exports = { setTokenCookie, restoreUser, requireAuth, validateLogin, passport };
