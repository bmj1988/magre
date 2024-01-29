const changingLines = (reading) => {
    let lines = []
    let cats = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
    for (let cat of cats) {
        if (reading[cat]) {
            lines.push(reading[cat])
        }
    }
    return lines
};

module.exports=changingLines;
