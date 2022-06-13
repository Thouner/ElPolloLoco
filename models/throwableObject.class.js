class ThrowableObject extends MovableObject {

    // height = 220;
    // width = 220;
    // x = 200;
    // y = 200;




    constructor(x, y) {
        super();
        this.loadImage('Bomb/bomb_0009_Layer-1.png');
        this.x = x;
        this.y = y;
        this.height = 250;
        this.width = 250;
        this.throw();
    }

    throw () {
        this.speedY = 32;
        this.applyGravity(280);
        console.log
        setInterval(() => {
            this.x += 10;
            if (this.y == 280) {
                tthis.x += 0;
            }
        }, 25);
    }





}