class Treasure extends MovableObject {
    height = 70;
    width = 70;
    x = 400;
    y = 410;
    constructor(x, y) {
        super().loadImage('treasures/3.png');
        this.x = x;
        this.y = y;
    }
}