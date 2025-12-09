const input = [
    /* Insert AoC day 9 input here */
    "7,1",
    "11,1",
    "11,7",
    "9,7",
    "9,5",
    "2,5",
    "2,3",
    "7,3",
]

const tiles = input.map(line => line.split(",").map(x => +x));

let maxSize = 0;
for(let i = 0; i < tiles.length; i++) {
    for(let j = i + 1; j < tiles.length; j++) {
        const area = (Math.abs(tiles[i][0] - tiles[j][0]) + 1) * (Math.abs(tiles[i][1] - tiles[j][1]) + 1);
        if(area > maxSize) {
            maxSize = area;
        }
    }
}
console.log(maxSize);

// Part 2
const exteriorTiles = [];

tiles.push(tiles[0]);
let lastTile = null;
for(const tile of tiles) {
    if(lastTile === null) {
        exteriorTiles.push({x: tile[0], y: tile[1]});
    } else {
        // Determine direction;
        const dx = Math.sign(tile[0] - lastTile[0]);
        const dy = Math.sign(tile[1] - lastTile[1]);

        while(lastTile[0] !== tile[0] || lastTile[1] !== tile[1]) {
            lastTile[0] += dx;
            lastTile[1] += dy;
            exteriorTiles.push({x: lastTile[0], y: lastTile[1]});
        }
    }
    lastTile = [...tile];
}

maxSize = 0;
for(let i = 0; i < tiles.length; i++) {
    for(let j = i + 1; j < tiles.length; j++) {
        const area = (Math.abs(tiles[i][0] - tiles[j][0]) + 1) * (Math.abs(tiles[i][1] - tiles[j][1]) + 1);
        if(area > maxSize) {
            // Check if valid
            const minX = Math.min(tiles[i][0], tiles[j][0]);
            const maxX = Math.max(tiles[i][0], tiles[j][0]);
            const minY = Math.min(tiles[i][1], tiles[j][1]);
            const maxY = Math.max(tiles[i][1], tiles[j][1]);

            // Check contents
            let valid = !exteriorTiles.some(t => t.x > minX && t.x < maxX && t.y > minY && t.y < maxY);

            if(valid) {
                maxSize = area;
            }
        }
    }
}
console.log(maxSize);
