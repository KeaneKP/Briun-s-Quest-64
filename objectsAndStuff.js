
function player() {
    this.x = 10;
    this.y = 10;
    this.dx = 0;
    this.controlledDx = 0;
    this.player = true;
    this.dy = 0;
    this.jumpImage = new Image();
    this.jumpImage.src = "assets/BriunDown.png";
    this.image = new Image();
    this.image.src = "assets/Briun.png";
    this.stamina = 1;
    this.draw = () => {
        let screenCoords = getScreenCoords(this);
        ctx.drawImage((this.dy >= -1) ? this.jumpImage : this.image, screenCoords.x, screenCoords.y);
    }
    this.jump = (y, x, particles) => {
        this.dy = -2 * y * this.stamina;
        this.dx = -2 * x * this.stamina;
        if (particles) {
            objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, '#f56c6c'));
            objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y + playerObject.image.naturalHeight, '#f56c6c'));
            objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, '#f56c6c'));
            objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y + playerObject.image.naturalHeight, '#f56c6c'));
            this.stamina -= 0.025;
        }
    } 
    this.update = () => {
        this.x += this.dx;
        this.x += this.controlledDx;
        this.y += this.dy;
        this.dy += gravity;
        if (this.dx > 0) {
            this.dx -= gravity;
        } else if (this.dx < 0) {
            this.dx += gravity;
        }
        //keyboard controls
        if (pressed["a"] || pressed["ArrowLeft"]) {
            this.controlledDx = -1;
        } else if (pressed["d"] || pressed["ArrowRight"]) {
            this.controlledDx = 1;
        }
        else{
            this.controlledDx = 0;
        }
    }
}
function hotdog(x, y) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "assets/Hotdog.png";
    this.update = () => {
        if (Math.abs(this.x - playerObject.x) < 100 && Math.abs(this.y - playerObject.y) < 100) {
           if (playerObject.y + playerObject.image.naturalHeight >= this.y - 1 && playerObject.y <= this.y + this.image.naturalHeight && playerObject.x + playerObject.image.naturalWidth >= this.x && playerObject.x <= this.x + this.image.naturalWidth) {
               playerObject.stamina = 1;
               this.dead = true;
               objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y +       playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y +       playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y +       playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
               objects.push(new particle(playerObject.x + playerObject.image.naturalWidth, playerObject.y + playerObject.image.naturalHeight, "#e0a709"));
           }
           
        } 
    }
    this.draw = () => {
        let screenCoords = getScreenCoords(this);
        ctx.drawImage(this.image, screenCoords.x, screenCoords.y);
    }
}
function particle(x, y, color){
    this.x = x;
    this.y = y;
    this.dead = false;
    this.dy = Math.random() - 1;
    this.dx = Math.random() * 3 - 1.5;
    this.color = color;
    setTimeout(() => {
        this.dead = true; 
    }, 1200);
    this.update = () => {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += gravity;
    }
    this.draw = () => {
        let screenCoords = getScreenCoords(this)
        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.fillRect(screenCoords.x, screenCoords.y, 1, 1);
        ctx.fillRect(screenCoords.x, screenCoords.y, 1, 1);
        ctx.fillRect(screenCoords.x, screenCoords.y, 1, 1);
        ctx.closePath();
    }
}
function platform(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    let random = Math.random();
    if (this.w >= 9 && random <= 0.35) {
        objects.push(new hotdog(Math.floor(this.x + this.w / 2 - 4.5), this.y - 6))
    }
    this.update = () => {
        if (Math.abs(this.x - playerObject.x) < 100 && Math.abs(this.y - playerObject.y) < 100) {
           if (playerObject.y + playerObject.image.naturalHeight >= this.y - 1 && playerObject.y + playerObject.image.naturalHeight - 3 <= this.y + 1 && playerObject.x + playerObject.image.naturalWidth >= this.x && playerObject.x <= this.x + this.w ) {
               playerObject.jump(1, 0, true);
           } 
            else if(playerObject.y >= this.y - 1 && playerObject.y <= this.y + 1 && playerObject.x + playerObject.image.naturalWidth >= this.x && playerObject.x <= this.x + this.w ){
              playerObject.jump(-1, 0, true);
           }
            if(playerObject.y + playerObject.image.naturalHeight - 3  >= this.y + 1 && playerObject.y <= this.y - 1 && playerObject.x + playerObject.image.naturalWidth/2 >= this.x && playerObject.x <= this.x + this.w ){
                playerObject.jump(.3, -0.75, false);
            }
            else if (playerObject.y + playerObject.image.naturalHeight - 3  >= this.y + 1 && playerObject.y <= this.y - 1 && playerObject.x + playerObject.image.naturalWidth >= this.x && playerObject.x + playerObject.image.naturalWidth/2 <= this.x + this.w ){
                playerObject.jump(.3, 0.75, false);
            }
        }
    }
    this.draw  = () => {
        let screenCoords = getScreenCoords(this);
        ctx.fillStyle = "#c22727";
        ctx.fillRect(screenCoords.x - 2, screenCoords.y + 1, 1, 1);
        ctx.fillRect(screenCoords.x - 2, screenCoords.y + 3, 1, 1);
        ctx.fillRect(screenCoords.x - 1, screenCoords.y + 2, 1, 1);
        ctx.fillRect(screenCoords.x, screenCoords.y + 1, 2, 1);
        ctx.fillRect(screenCoords.x, screenCoords.y + 2, 1, 1);
        ctx.fillRect(screenCoords.x, screenCoords.y + 3, 2, 1);
        ctx.fillRect(screenCoords.x + 1, screenCoords.y, this.w - 2, 1);
        ctx.fillRect(screenCoords.x + 1, screenCoords.y + 4, this.w - 2, 1);
        ctx.fillRect(screenCoords.x + w - 1, screenCoords.y + 1, 2, 1);
        ctx.fillRect(screenCoords.x + w, screenCoords.y + 2, 1, 1);
        ctx.fillRect(screenCoords.x + w - 1, screenCoords.y + 3, 2, 1);
        ctx.fillRect(screenCoords.x + w + 2, screenCoords.y + 1, 1, 1);
        ctx.fillRect(screenCoords.x + w + 2, screenCoords.y + 3, 1, 1);
        ctx.fillRect(screenCoords.x + w + 1, screenCoords.y + 2, 1, 1);
        ctx.fillStyle = "#f56c6c";
        
        ctx.fillRect(screenCoords.x + 2, screenCoords.y + 1, w - 3, 3);
        ctx.fillRect(screenCoords.x + 1, screenCoords.y + 2, 1, 1);
        ctx.fillRect(screenCoords.x + w - 1, screenCoords.y + 2, 1, 1); 
    }
}
let objects = [];
objects.push(new player());
objects.push(new platform(-50, 60, 100))
/*objects.push(new platform(30, 40, 20))
objects.push(new platform(50, 15, 20))
objects.push(new platform(80, -10, 4))*/



/*Realm of the dead code:

Here lies the true briun


    this.draw = function() {
        ctx.beginPath()
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.rect(this.x-5, this.y, 3, 8);
        ctx.rect(this.x+2, this.y, 3, 8);
        ctx.fill();
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle= 'red';
        ctx.rect(this.x-4, this.y+2, 8, 1)
        ctx.rect(this.x-3, this.y-2, 1, 2)
        ctx.rect(this.x+2, this.y-2, 1, 2)
        ctx.fill()
        ctx.closePath()
    }


//*/