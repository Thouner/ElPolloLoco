class Brain extends MovableObject {
    height = 60;
    width = 60;



    constructor(x, y) {
        super().loadImage('treasures/brain.png');
        this.x = x;
        this.y = y;
    }
}