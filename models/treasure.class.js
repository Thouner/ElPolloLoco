class Treasure extends MovableObject {
    height = 60;
    width = 60;
    // x = 400;
    // y = 410;

    offSetX = 0;
    offSetY = 0;
    offSetWidth = 0;
    offSetHeight = 0;

    constructor(x, y) {
        super().loadImage('treasures/3.png');
        this.x = x;
        this.y = y;
    }
}