const router = require('express').Router()
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, validateLogin } = require('../../../utils/auth');
const { User } = require('../../../db/models');


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

module.exports = router;
