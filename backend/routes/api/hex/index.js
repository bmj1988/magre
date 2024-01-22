const router = require('express').Router()
const { findHex } = require('../../../utils/reading')

router.get('/', findHex, async (req, res) => {
    const response = {}
    response.reading1 = req.reading1
    console.log(req.reading1.trigrams)
    response.alt = req?.alt
    response.alt.trigrams = req.altReadingTrigram

    res.json(response)
})

module.exports = router;
