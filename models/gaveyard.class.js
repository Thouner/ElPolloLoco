class Graveyard extends MovableObject {
    height = 200;
    width = 200;


    constructor(x, y) {
        super();
        this.loadImage('imageForIntro/graveyard-finish.png');
        this.x = (x + 50);
        this.y = (y + 75);
        // this.y = (y - 200);
        // this.y += 3;
        // this.speedY = 32;

        // this.applyGravity(290)
    }


}