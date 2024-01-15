const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { setTokenCookie, requireAuth, validateLogin } = require('../../../utils/auth')
const { User } = require('../../../db/models')

/// USER ROUTER
router.post(
    '/',
    async (req, res) => {
        const { email, password, name } = req.body;
        const hashedPw = bcrypt.hashSync(password);
        const user = await User.create({ email, name, hashedPw });

        const safeUser = {
            id: user.id,
            email: user.email,
            name: user.name,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

/// Get Current User
router.get('/', async (req, res) => {
    const { user } = req;
    if (user) {
        const info = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        return res.json({
            info,
        })
    }
    else return res.json({ user: null })

})
module.exports = router;
