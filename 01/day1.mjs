let input = [
    /* Insert AoC day 1 input here */
    "L68",
    "L30",
    "R48",
    "L5",
    "R60",
    "L55",
    "L1",
    "L99",
    "R14",
    "L82",
]

let zeroCount = 0;
let zeroClicks = 0;

let point = 50;
for(let i = 0; i < input.length; i++) {
    const dir = input[i][0];
    const amount = (+input[i].substring(1)) % 100;
    zeroClicks += ~~((+input[i].substring(1)) / 100);
    if(dir === 'L') {
        point = (point - amount);
        if(point <= 0 && point !== -amount) {
            zeroClicks += 1;
        }
        if(point < 0) {
            point += 100;
        }
    } else {
        point = (point + amount);
        if(point >= 100) {
            point -= 100;
            zeroClicks += 1;
        }
    }

    if(point === 0) {
        zeroCount++;
    }
}
console.log(zeroCount, zeroClicks);