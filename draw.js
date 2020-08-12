const draw = () => {
    ctx.clearRect(0,0,64,64);
    //Draw sutff? here.
    objects.forEach(object => {
        object.draw();
    })
    window.requestAnimationFrame(draw);
    ctx.font = "12px Monospace"
    ctx.fillText(Math.floor(playerObject.y-50)*-1, 2, 10);
}