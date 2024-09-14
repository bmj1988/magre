const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { setTokenCookie, requireAuth, validateLogin } = require('../../../utils/auth')
const { User } = require('../../../db/models')
const { chineseZodiacGenerator } = require('../../../utils/zodiac')

/// USER ROUTER
router.post(
    '/',
    async (req, res) => {
        const { email, password, name } = req.body;
        const hashedPw = bcrypt.hashSync(password);
        const [branchId, stemId] = chineseZodiacGenerator(new Date(`${req.birthdate}`))
        const user = await User.create({ email, name, hashedPw, branchId, stemId });

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
            name: user.name,
        };
        return res.json({
            info,
        })
    }
    else return res.json({ user: null })

})
module.exports = router;
