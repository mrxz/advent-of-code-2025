let input = [
    /* Insert AoC day 7 input here */
    ".......S.......",
    "...............",
    ".......^.......",
    "...............",
    "......^.^......",
    "...............",
    ".....^.^.^.....",
    "...............",
    "....^.^...^....",
    "...............",
    "...^.^...^.^...",
    "...............",
    "..^...^.....^..",
    "...............",
    ".^.^.^.^.^...^.",
    "...............",
]

let board = {};
const getKey = (x,y) => `${x}x${y}`;
const setValue = (board, x, y, value) => {
    board[getKey(x, y)] = value;
}
const getValue = (board, x, y, fallback = null) => {
    return board[getKey(x, y)] ?? fallback
}

// Parse
let startX = -1;
let startY = -1;

const height = input.length;
const width = input[0].length;
for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
        setValue(board, x, y, input[y][x]);
        if(input[y][x] === 'S') {
            startX = x;
            startY = y;
        }
    }
}

// Part 1
const splits = {};
let heads = [{x: startX, y: startY}];
while(heads.length) {
    const newHeads = [];
    for(const head of heads) {
        const nextX = head.x;
        const nextY = head.y + 1;
        if(nextY > height) {
            continue;
        }

        const tile = getValue(board, nextX, nextY);
        if(tile === '^') {
            const key = `${nextX}|${nextY}`;
            if(!(key in splits)) {
                splits[key] = true;
                newHeads.push({x: nextX - 1, y: nextY});
                newHeads.push({x: nextX + 1, y: nextY});
            }
        } else {
            newHeads.push({x: nextX, y: nextY});
        }
    }
    heads = newHeads;
}
console.log(Object.keys(splits).length);

// Part 2
const subCounts = "1".repeat(width).split("").map(x => +x);
for(let y = height - 1; y >=0; y--) {
    for(let x = 0; x < width; x++) {
        if(getValue(board, x, y) === '.') {
            continue;
        }

        subCounts[x] = subCounts[x - 1] + subCounts[x + 1];
    }
}
console.log(subCounts[startX]);