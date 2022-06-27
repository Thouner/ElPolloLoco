class MacGuffin extends MovableObject {
    height = 200;
    width = 200;


    constructor(x, y) {
        super();
        this.loadImage('imageForIntro/much-money.png');
        this.x = (x + 150);
        this.y = (y + 115);
    }



}