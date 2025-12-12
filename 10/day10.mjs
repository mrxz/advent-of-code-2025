let input = [
    /* Insert AoC day 10 input here */
    "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
    "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}",
    "[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
]

let sum = 0;
for(const line of input) {
    const parts = line.split(" ");
    const target = parts[0].substring(1, parts[0].length - 1).split("").map(t => t === '#');
    const buttons = parts.slice(1, parts.length - 1).map(x => x.substring(1, x.length - 1).split(",").map(i => +i));
    const joltage = parts[parts.length - 1].substring(1, parts[parts.length - 1].length - 1).split(",").map(i => +i);

    // Part 1
    let queue = [new Array(target.length).fill(false)];
    let step = 0;
    outer:
    while(queue.length > 0) {
        const newQueue = [];

        for(let i = 0; i < queue.length; i++) {
            const state = queue[i];
            if(state.every((l, i) => l === target[i])) {
                sum += step;
                break outer;
            }

            // Try all buttons
            for(let button of buttons) {
                const newState = [...state];
                for(let light of button) {
                    newState[light] = !newState[light];
                }
                newQueue.push(newState);
            }
        }

        queue = newQueue;
        step++;
    }
}

console.log(sum);