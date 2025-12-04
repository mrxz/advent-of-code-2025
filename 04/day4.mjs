let input = [
    /* Insert AoC day 4 input here */
    "..@@.@@@@.",
    "@@@.@.@.@@",
    "@@@@@.@.@@",
    "@.@@@@..@.",
    "@@.@@@@.@@",
    ".@@@@@@@.@",
    ".@.@.@.@@@",
    "@.@@@.@@@@",
    ".@@@@@@@@.",
    "@.@.@@@.@.",
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
const height = input.length;
const width = input[0].length;
for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
        setValue(board, x, y, input[y][x]);
    }
}

let sum = 0;
let count = 0;
do {
    // Double-buffer
    const boardClone = {};

    count = 0;
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            if(getValue(board, x, y) !== '@') {
                continue;
            }

            // Roll of paper, check if accessible
            let neighbours =
                (getValue(board, x - 1, y - 1) === '@' ? 1 : 0) +
                (getValue(board, x    , y - 1) === '@' ? 1 : 0) +
                (getValue(board, x + 1, y - 1) === '@' ? 1 : 0) +
                (getValue(board, x - 1, y    ) === '@' ? 1 : 0) +
                //(getValue(board, x    , y    ) === '@' ? 1 : 0) +
                (getValue(board, x + 1, y    ) === '@' ? 1 : 0) +
                (getValue(board, x - 1, y + 1) === '@' ? 1 : 0) +
                (getValue(board, x    , y + 1) === '@' ? 1 : 0) +
                (getValue(board, x + 1, y + 1) === '@' ? 1 : 0);
            if(neighbours < 4) {
                count++;
            } else {
                setValue(boardClone, x, y, '@');
            }
        }
    }

    if(sum === 0) {
        // Part 1
        console.log(count);
    }
    sum += count;

    // Swap board
    board = boardClone;
} while(count > 0);
console.log(sum);