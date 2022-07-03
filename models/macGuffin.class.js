class MacGuffin extends MovableObject {
    height = 200;
    width = 200;


    /**
     * draw the gold when winning the level
     * 
     * @param {number} x - positioning on the x axis
     * @param {number} y - positioning on the y axis
     */
    constructor(x, y) {
        super();
        this.loadImage('imageForIntro/much-money.png');
        this.x = (x + 150);
        this.y = (y + 115);
    }
}