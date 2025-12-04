let input = [
    /* Insert AoC day 3 input here */
    "987654321111111",
    "811111111111119",
    "234234234234278",
    "818181911112111",
]

// Part 1
let sum = 0;
for(const line of input) {
    let left = +line.at(-2);
    let right = +line.at(-1);
    for(let i = line.length - 3; i >= 0; i--) {
        const c = +line[i];
        if(c >= left) {
            right = Math.max(right, left);
            left = c;
        }
    }
    sum += left*10 + right;
}
console.log(sum);

// Part 2
sum = 0;
for(const line of input) {
    const lineDigits = line.split("").map(x => +x);
    const digits = [];

    // Search the highest possible digit
    let start = 0;
    while(digits.length !== 12) {
        // Limit the range to valid digits
        const searchRange = lineDigits.slice(start, line.length - (11 - digits.length));
        const max = Math.max(...searchRange);
        const index = searchRange.indexOf(max);

        // Add the digit to the result and advance the start index
        digits.push(max);
        start += index + 1;
    }

    sum += +digits.join('');
}
console.log(sum);