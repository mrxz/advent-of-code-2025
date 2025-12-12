let input = [
    /* Insert AoC day 11 input here */
    "aaa: you hhh",
    "you: bbb ccc",
    "bbb: ddd eee",
    "ccc: ddd eee fff",
    "ddd: ggg",
    "eee: out",
    "fff: out",
    "ggg: out",
    "hhh: ccc fff iii",
    "iii: out",
]

const nodes = {}
for(let line of input) {
    const [id, outs] = line.split(": ");
    nodes[id] = outs.split(" ");
}

const memo = {}
function paths(node, dac = false, fft = false) {
    if(node === 'out') {
        return (dac && fft) ? 1 : 0;
    }
    const key = `${node}|${dac}|${fft}`;
    if(key in memo) {
        return memo[key];
    }

    let result = 0;
    for(const out of nodes[node]) {
        result += paths(out, dac || out === 'dac', fft || out === 'fft');
    }
    memo[key] = result;
    return result;
}

// Part 1
console.log(paths("you", true, true))
// Part 2
if("svr" in nodes) {
    console.log(paths("svr"))
}