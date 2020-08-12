let ctx = document.getElementById("c").getContext("2d");
let S = 0;
let cameraCoords = {
    x: 0,
    y: 0
}
let gravity = 0.03;
const getScreenCoords = object => {
    return {
        x: object.x - cameraCoords.x,
        y: object.y - cameraCoords.y 
    }
}
window.onresize = function(){
    setSize();
}
window.onload = function(){
    setSize();
    setInterval(update, 1000/60);
    draw();
}
function setSize(){
    S = ctx.canvas.style.width = ctx.canvas.style.height = Math.min(document.body.clientWidth, document.body.clientHeight) + "px";
    if(document.body.clientWidth > document.body.clientHeight){
        //side margins
        ctx.canvas.style.margin = "0px " +(document.body.clientWidth-parseInt(S))/2 + "px";
    }
    else if(document.body.clientWidth < document.body.clientHeight){
        //vertical margins
        ctx.canvas.style.margin = (document.body.clientHeight-parseInt(S))/2 + "px 0px";
    }
    else{
        ctx.canvas.style.margin = "0px";
    }
}
let pressed = [];
['keydown', 'keyup'].forEach(type => document.addEventListener(
  type,
  event => {
    return pressed[event.key] = type == 'keydown';
  },
  false
));