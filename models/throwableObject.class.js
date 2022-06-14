class ThrowableObject extends MovableObject {

    // height = 220;
    // width = 220;
    // x = 200;
    // y = 200;
    speedForX = 10;



    constructor(x, y, playerDierection) {
        super();
        this.loadImage('Bomb/bomb_0009_Layer-1.png');
        this.x = x;
        this.y = y;
        this.height = 250;
        this.width = 250;
        this.throw(playerDierection);
    }

    throw (playerDierection) {
        if (playerDierection) {
            this.speedY = 32;
            this.applyGravity(280);
            setInterval(() => {
                this.x -= this.speedForX;
                if (this.y > 275) {
                    this.speedForX = 0;
                    // console.log('kaboom');
                }

            }, 25);
        } else {
            this.speedY = 32;
            this.applyGravity(280);
            setInterval(() => {
                this.x += this.speedForX;
                if (this.y > 275) {
                    this.speedForX = 0;
                    // console.log('kaboom');
                }
            }, 25);
        }
    }





}