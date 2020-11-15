const colors = ['#F7F42D', '#D47B26', '#2633D4', '#F5A76C', '#D60705', '#2DEEF7', '#F5E16C', '#ADC1D7', '#B6D996', '#BE6E46', '#CDE7B0']

const getColorTable = (n) => {
    let newTable = []
    let i = 0
    while (i < n) {
        newTable.push(colors[i])
        i++
    }

    return newTable;
}

export default getColorTable;