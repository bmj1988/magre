const emdash = "—"
    const solid = `${emdash}${emdash}${emdash} \n`
    const broken = `${emdash}   ${emdash} \n`
    const lineConverter = (lower, upper) => {
        composition = lower += upper
        const line = [];
        for (let i = 0; i < composition.length; i++) {
            if (composition[i] === '1') line.push(solid)
            else {
                line.push(broken)
            }
        }
        return line
    }
module.exports = lineConverter;
