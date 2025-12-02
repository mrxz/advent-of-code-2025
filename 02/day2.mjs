/* Insert AoC day 2 input here */
let input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

const ranges = input.split(",").map(r => r.split("-").map(x => +x));

let sum1 = 0;
let sum2 = 0;
for(const range of ranges) {
    for(let i = range[0]; i <= range[1]; i++) {
        let str = ""+i;

        let patternLength = false;
        for(let s = 1; s <= str.length/2; s++) {
            if(str.length % s !== 0) {
                continue;
            }
            let pattern = str.substring(0, s);
            if(str === pattern.repeat(str.length/s)) {
                patternLength = s;
                break;
            }
        }

        if(patternLength) {
            // If pattern fits even amount of times, it can be split through the middle
            if((str.length / patternLength % 2) === 0) {
                sum1 += i;
            }
            sum2 += i;
        }
    }
}

console.log(sum1, sum2);