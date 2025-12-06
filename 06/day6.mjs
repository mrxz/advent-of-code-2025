const input = [
    /* Insert AoC day 6 input here */
    "123 328  51 64 ",
    " 45 64  387 23 ",
    "  6 98  215 314",
    "*   +   *   +  ",
]

// Part 1
const values = [];
for(let i = 0; i < input.length - 1; i++) {
    const parts = input[i].split(" ").filter(x => x !== '');
    for(let j = 0; j < parts.length; j++) {
        (values[j] ??= []).push(+parts[j]);
    }
}

let sum = 0;
const operators = input[input.length - 1].split(" ").filter(x => x !== '');
for(let j = 0; j < operators.length; j++) {
    if(operators[j] === '+') {
        sum += values[j].reduce((sum, x) => sum + x, 0);
    } else {
        sum += values[j].reduce((sum, x) => sum * x, 1);
    }
}
console.log(sum);

// Part 2
const colIndices = [];
const operatorsLine = input[input.length - 1];
for(let col = 0; col < operatorsLine.length; col++) {
    if(operatorsLine[col] !== ' ') {
        colIndices.push({ index: col, operator: operatorsLine[col] });
    }
}

const colDigits = [];
for(let i = 0; i < input.length - 1; i++) {
    const line = input[i];
    for(let col = 0; col < line.length; col++) {
        (colDigits[col] ??= []).push(line[col]);
    }
}

const colNumbers = colDigits.map(cn => +cn.join(''));

sum = 0;
for(let i = 0; i < colIndices.length; i++) {
    const numbers = colNumbers.slice(colIndices[i].index, colIndices[i + 1]?.index ?? undefined).filter(x => x !== 0);
    if(colIndices[i].operator === '+') {
        sum += numbers.reduce((sum, x) => sum + x, 0);
    } else {
        sum += numbers.reduce((sum, x) => sum * x, 1);
    }
}
console.log(sum);
