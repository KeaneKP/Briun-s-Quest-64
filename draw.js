const draw = () => {
    ctx.clearRect(0,0,64,64);
    //Draw sutff? here.
    objects.forEach(object => {
        object.draw();
    })
    window.requestAnimationFrame(draw);
    ctx.font = "12px Monospace"
    ctx.fillStyle = 'white';
    ctx.fillText(Math.floor(playerObject.y-50)*-1, 2, 10);
    ctx.fillRect(62, 10, 2, 40*playerObject.stamina);

    if (pressed["x"]) {
        chunksArray.forEach(chunk => {
            let chunkCoords = {
                x: chunk.x * 50,
                y: chunk.y * 50
            };
            let screenCoords = getScreenCoords(chunkCoords);
            ctx.strokeRect(screenCoords.x, screenCoords.y, 50, 50);
        })
    }
}