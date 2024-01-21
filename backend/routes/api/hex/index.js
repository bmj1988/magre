const router = require('express').Router()
const hexagramGenerator = require('../../../utils/reading')

router.get('/', async (req, res) => {
    console.log(typeof hexagramGenerator, hexagramGenerator)
    const result = hexagramGenerator();
    res.json({ result })
})

module.exports = router;
