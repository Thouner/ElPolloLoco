class bomb extends MovableObject {
    height = 250;
    width = 250;


    xBox = this.x;
    yBox = this.y;
    heightBox = this.height;
    widthBox = this.width;
    constructor(x, y) {
        super().loadImage('Bomb/bomb_0008_Layer-2.png');
        this.x = x;
        this.y = y;
    }
}