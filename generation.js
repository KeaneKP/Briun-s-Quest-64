let chunks = {}
const getChunk = coords => {
    let x = Math.floor(coords.x/50).toString();
    let y = Math.floor(coords.y/50).toString();
    if (!chunks[y]) {
        chunks[y] = {};
    }
    if (!chunks[y][x]) {
        // I generate width seperate because it will determine how far right the platform can be without going out of the chunk
        let width = Math.floor(Math.random() * 20)+6;
        chunks[y][x] = {
            x: x,
            y: y,
            platform: new platform(Math.floor(Math.random() * 48) + 50*x, Math.floor(Math.random() * 48 - width) + 50 * y, width)
        }
        objects.push(chunks[y][x].platform)
    }
    return {
        chunk: chunks[y][x],
        x: x,
        y: y
    };
}