let input = [
    /* Insert AoC day 5 input here */
    "3-5",
    "10-14",
    "16-20",
    "12-18",
    "",
    "1",
    "5",
    "8",
    "11",
    "17",
    "32",
]

// Parse
const ranges = [];
let i = 0;
for(; i < input.length; i++) {
    const line = input[i];
    if(line === "") {
        break;
    }

    ranges.push(line.split("-").map(x => +x));
}

// Part 1
let count = 0;
for(; i < input.length; i++) {
    const id = +input[i];
    if(ranges.some(r => id >= r[0] && id <= r[1])) {
        count++;
    }
}
console.log(count);


// Part 2
ranges.sort((a,b) => a[0] - b[0]);
const newRanges = [];

let newRange = null;
for(let i = 0; i < ranges.length; i++) {
    if(newRange === null) {
        newRange = [...ranges[0]];
        continue;
    }

    const toAdd = ranges[i];
    if(toAdd[0] >= newRange[0] && toAdd[0] <= newRange[1]) {
        newRange[1] = Math.max(toAdd[1], newRange[1]);
    } else {
        newRanges.push(newRange);
        newRange = [...toAdd];
    }
}
newRanges.push(newRange);

console.log(newRanges.reduce((sum, r) => sum + (r[1] - r[0] + 1), 0));
