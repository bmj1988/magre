const router = require('express').Router()
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, validateLogin, passport } = require('../../../utils/auth');
const { User } = require('../../../db/models');

router.use(passport.initialize())

/// SESSION ROUTER

router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.unscoped().findOne({
        where: {
            email: credential
        }
    });
    if (!user || !bcrypt.compareSync(password, user.hashedPw.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: `Provided credentials invalid.` };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

router.get('/auth/google', passport.authenticate('google'));

router.get('/google/redirect', passport.authenticate('google', { session: false }), async (req, res) => {
    const token = await setTokenCookie(res, req.user)
    return res.json({
        token
    })
})


module.exports = router;
