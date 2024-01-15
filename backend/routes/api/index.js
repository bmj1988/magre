const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const userRouter = require('./users')
const sessionRouter = require('./session')
router.use(restoreUser)
router.use('/session', sessionRouter);
router.use('/user', userRouter)

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            email: 'demoOwner@demo.net'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

module.exports = router;
