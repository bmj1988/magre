const grabHanzi = (name) => {
    let firstIdx = name.indexOf('(') + 1
    let secondIdx = name.indexOf(')')
    return name.slice(firstIdx, secondIdx)
}

module.exports=grabHanzi
