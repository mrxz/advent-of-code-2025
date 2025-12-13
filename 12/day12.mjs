let input = [
    /* Insert AoC day 12 input here */
    "0:",
    "###",
    "##.",
    "##.",
    "",
    "1:",
    "###",
    "##.",
    ".##",
    "",
    "2:",
    ".##",
    "###",
    "##.",
    "",
    "3:",
    "##.",
    "###",
    "##.",
    "",
    "4:",
    "###",
    "#..",
    "###",
    "",
    "5:",
    "###",
    ".#.",
    "###",
    "",
    "4x4: 0 0 0 0 2 0",
    "12x5: 1 0 1 0 2 2",
    "12x5: 1 0 1 0 3 2",
]

// Parse shapes
let shapes = [];

let i = 0;
let shape = [];
for(; i < input.length; i++) {
    const line = input[i];
    // Detect a label
    if(line.includes(":")) {
        if(line.includes("x")) {
            // Begin of regions
            break;
        }
        continue;
    }

    if(line === '') {
        shapes.push(shape);
        shape = [];
    } else {
        shape.push(line.split(""))
    }
}

// Compute all shape variants
const shapeHashes = [];
shapes = shapes.map((shape, shapeIndex) => {
    // Rotate shape by 90
    function rotate90(s) {
        let result = JSON.parse(JSON.stringify(s));
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                result[y][x] = s[2 - x][y];
            }
        }
        return result;
    }

    // Flip shape horizontally
    function flipH(s) {
        let result = JSON.parse(JSON.stringify(s));
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                result[y][x] = s[y][2 - x];
            }
        }
        return result;
    }

    // Deduplicate
    const collection  = {};
    function addShape(s) {
        const key = s.map(x => x.join('|')).join('|');
        collection[key] = s;
    }

    for(let i = 0; i < 4; i++) {
        addShape(shape);
        addShape(flipH(shape));
        shape = rotate90(shape);
    }

    let variantIndex = 0;
    for(const entry of Object.entries(collection)) {
        // Pre-compute shape hash/mask
        let hash;
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                const bit = y * 3 + x;
                if(entry[1][y][x] !== '.') {
                    hash |= 1 << bit;
                }
            }
        }
        shapeHashes.push({ hash, shapeIndex, variantIndex: variantIndex++, shapeVariant: entry[1] });
    }

    return Object.values(collection);
});

// Set/get board values during DFS
let boardWidth = 0;
let boardHeight = 0;
const setValue = (board, x, y, value) => {
    board[y * boardWidth + x] = value;
}
const getValue = (board, x, y, fallback = null) => {
    return board[y * boardWidth + x] ?? fallback
}

// Pre-compute shapes
const lut = []
for(let hash = 0; hash < 512; hash++) {
    lut.push(shapeHashes.filter(sh => (sh.hash & hash) === 0));
}

const dfs = (width, height, board, remaining, totalRemaining, depth = 0, index = 0) => {
    if(totalRemaining === 0) { return board; }
    const tilePositions = (width - 2) * (height - 2);

    const computeHash = (bx, by) => {
        let hash = 0;
        for(let sx = 0; sx < 3; sx++) {
            for(let sy = 0; sy < 3; sy++) {
                const x = bx + sx
                const y = by + sy;
                const bit = sy * 3 + sx;
                hash |= (!!getValue(board, x, y, 0)) << bit;
            }
        }
        return hash;
    }

    // Move over the board
    for(let i = index; i <= tilePositions - totalRemaining; i++) {
        const x = i % (width - 2);
        const y = ~~(i / (width - 2));
        const tiles = (width * (height - y)) + (width - x);
        if(tiles/9 < totalRemaining) { break; }

        let hash = computeHash(x, y);
        for(const shapeHash of lut[hash]) {
            // Check if this shape still needs to be placed
            if(remaining[shapeHash.shapeIndex] === 0) {
                continue;
            }
            const shapeVariant = shapeHash.shapeVariant;

            // Remove it from remaining for recursive calls.
            remaining[shapeHash.shapeIndex]--;

            // Populate the board
            for(let sx = 0; sx < 3; sx++) {
                for(let sy = 0; sy < 3; sy++) {
                    if(shapeVariant[sy][sx] !== '#') { continue; }
                    setValue(board, x + sx, y + sy, 1)
                }
            }

            // Fits, check if this leads to a solution
            const subResult = dfs(width, height, board, remaining, totalRemaining - 1, depth + 1, i + 1);
            if(subResult) {
                return subResult;
            }

            // Restore board state
            for(let sx = 0; sx < 3; sx++) {
                for(let sy = 0; sy < 3; sy++) {
                    if(shapeVariant[sy][sx] !== '#') { continue; }
                    setValue(board, x + sx, y + sy, 0)
                }
            }
            remaining[shapeHash.shapeIndex]++;
        }

        // Special case for the outer layer
        if(depth === 0) {
            return false;
        }
    }

    // Nothing fits
    return false;
};

// Parse regions
let possible = 0;
const numRegions = input.length - i;
for(; i < input.length; i++) {
    const line = input[i];
    const [width, height] = line.split(": ")[0].split("x").map(x => +x);
    const toPlace = line.split(": ")[1].split(" ").map(x => +x);

    boardWidth = width;
    boardHeight = height;
    let board = new Array(boardWidth * boardHeight).fill(0);
    const totalRemaining = toPlace.reduce((sum, x) => sum + x, 0);
    let result = !!dfs(width, height, board, toPlace, totalRemaining);
    if(result) {
        possible++;
    }
    console.log(`${possible}/${numRegions}: ${result}`);
}
console.log(possible);