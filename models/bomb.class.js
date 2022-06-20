class bomb extends MovableObject {
    height = 250;
    width = 250;

    offSetX = 100;
    offSetY = 100;
    offSetWidth = 200;
    offSetHeight = 200;

    constructor(x, y) {
        super().loadImage('Bomb/bomb_0008_Layer-2.png');
        this.x = x;
        this.y = y;
    }
}