const { Op } = require('sequelize')
const { Hexagram, Trigram } = require('../db/models')

const lineValues = {
    '0': ['solid', true],
    '1': ['broken'],
    '2': ['solid'],
    '3': ['broken', true]
}

const randIntExcluse = (num) => {
    return Math.floor(Math.random() * num)
}

const lineGenerator = () => { /// 3 FLIPS PER LINE / 9 PER TRIGRAM / 18 FLIPS PER HEX
    const flipOutcomes = []
    for (let i = 0; i < 3; i++) {
        const flipChance = randIntExcluse(2)
        flipOutcomes.push(flipChance)
    }
    let line = 0
    for (let outcome of flipOutcomes) {
        if (outcome) line++
    }
    const lineValueIdx = line.toString();
    return lineValues[lineValueIdx]
}

const runQauntity = (func) => {
    const quantity = (num) => {
        let values = []
        for (let i = 0; i < num; i++) {
            const lineValue = func()
            values.push(lineValue)
        }
        return values
    }
    return quantity
}

const run = runQauntity(lineGenerator)

const trigramGenerator = () => {
    const trigram = run(3)
    return trigram
}

const changingLinesProcessor = (val) => {
        switch (val) {
            case 0:
                return 'first'
            case 1:
                return 'second'
            case 2:
                return 'third'
            case 3:
                return 'fourth'
            case 4:
                return 'fifth'
            case 5:
                return 'sixth'
            default: return
        }
    }

const hexagramGenerator = () => {
    const tri1 = trigramGenerator();
    const tri2 = trigramGenerator();
    const hex = tri1.concat(tri2)
    let hexCode = []
    let alt = []
    let sendAlt = false
    let changingLines = []

    for (let i = 0; i < 6; i++) {
        const linecell = hex[i] /// THIS ARRAY REPRESENTS [LINE, BOOLEAN INDICATING CHANGE]
        const line = linecell[0] /// THIS IS THE LINE
        line === 'solid' ? hexCode.push('1') : hexCode.push('0')
        if (linecell[1]) { // IF THERE IS A CHANGING LINE
            changingLines.push(changingLinesProcessor(i))
            if (!sendAlt) sendAlt = !sendAlt /// IF SENDALT FLAG FALSE, FLIP TO TRUE
            switch (hexCode[i]) {
                case '0': {
                    alt.push('1')
                    break
                }
                case '1': {
                    alt.push('0')
                    break
                }
            }
        }
        else {
            alt.push(hexCode[i])
        }
    }
    console.log(`CHANGING LINES`, changingLines)
    hexCode = hexCode.join('')
    alt = alt.join('')



    return [hexCode, alt, sendAlt, changingLines]
}

const findHex = async (req, res, next) => {
    const [hexCode, alt, sendAlt, changingLines] = hexagramGenerator();
    console.log(`RESULTS CHANGING LINES`, changingLines, 'SEND ALT', sendAlt, alt)
    req.reading = await Hexagram.findOne({
        attributes: [...changingLines],
        where: {
            composition: hexCode
        },
        include: [
            {
                model: Trigram,
                as: 'upperTrigram',
                attributes: ['element', 'phase', 'composition']
            },
            {
                model: Trigram,
                as: 'lowerTrigram',
                attributes: ['element', 'phase', 'composition']
            },
        ]
    })

    if (sendAlt) {
        req.alt = await Hexagram.findOne({
            where: { composition: alt },
            include: [
                {
                    model: Trigram,
                    as: 'upperTrigram',
                    attributes: ['element', 'phase', 'composition']
                },
                {
                    model: Trigram,
                    as: 'lowerTrigram',
                    attributes: ['element', 'phase', 'composition']
                },
            ]
        })

    }
    next();
}
// const hexMethod = () => {
//     return randIntExcluse(64).toString(2)
// }

module.exports = {
    hexagramGenerator,
    findHex
};
