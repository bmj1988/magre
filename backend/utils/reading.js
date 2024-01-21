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

const hexagramGenerator = () => {
    const tri1 = trigramGenerator();
    const tri2 = trigramGenerator();
    const hex = tri1.concat(tri2)
    const hexCode = []
    const alt = []
    let sendAlt = false

    for (let i = 0; i < 6; i++) {
        const linecell = hex[i]
        const line = hex[i][0]
        line === 'solid' ? hexCode.push('1') : hexCode.push('0')
        if (linecell[1]) {
            if (!sendAlt) sendAlt = !sendAlt
            switch (hexCode[i]) {
                case '0': {
                    alt.push('1')
                }
                case '1': {
                    alt.push('0')
                }
            }
        }
        else {
            alt.push(hexCode[i])
        }
    }

    return [hexCode, alt,  sendAlt]
}

// const hexMethod = () => {
//     return randIntExcluse(64).toString(2)
// }

module.exports = hexagramGenerator;
