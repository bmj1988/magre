const router = require('express').Router()
const { findHex } = require('../../../utils/reading')

router.get('/', findHex, async (req, res) => {
    const response = {}
    response.reading1 = req.reading1
    response.alt = req?.alt

    res.json(response)
})

module.exports = router;
