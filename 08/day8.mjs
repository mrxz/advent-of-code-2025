let input = [
    /* Insert AoC day 8 input here */
    "162,817,812",
    "57,618,57",
    "906,360,560",
    "592,479,940",
    "352,342,300",
    "466,668,158",
    "542,29,236",
    "431,825,988",
    "739,650,466",
    "52,470,668",
    "216,146,977",
    "819,987,18",
    "117,168,530",
    "805,96,715",
    "346,949,466",
    "970,615,88",
    "941,993,340",
    "862,61,35",
    "984,92,344",
    "425,690,689",
]

// Parse
const boxes = input.map(line => line.split(",").map(x => +x));

const circuits = {};
const connections = [];
for(let i = 0; i < boxes.length; i++) {
    boxes[i].__id = i;
    circuits[i] = [boxes[i]];

    for(let j = i + 1; j < boxes.length; j++) {
        connections.push({
            d: Math.sqrt((boxes[i][0] - boxes[j][0])**2 + (boxes[i][1] - boxes[j][1])**2 + (boxes[i][2] - boxes[j][2])**2),
            a: boxes[i],
            b: boxes[j]
        });
    }
}
// Sort connections based on distance
connections.sort((a,b) => a.d - b.d);
for(let i = 0; i < connections.length; i++) {
    const connection = connections[i];
    if(connection.a.__id !== connection.b.__id) {
        const minId = Math.min(connection.a.__id, connection.b.__id);
        const oldId = connection.a.__id === minId ? connection.b.__id : connection.a.__id;
        circuits[oldId].forEach(box => box.__id = minId);
        circuits[minId].push(...circuits[oldId]);
        circuits[oldId] = [];

        // Check if one large circuit has been constructed
        if(circuits[minId].length === input.length) {
            // Part 2
            console.log(connection.a[0] * connection.b[0]);
            break;
        }
    }

    // Part 1
    if(i === 9 || i === 999) {
        console.log(Object.values(circuits).map(c => c.length).sort((a,b) => b - a).slice(0, 3).reduce((acc, x) => acc * x, 1));
    }
}
