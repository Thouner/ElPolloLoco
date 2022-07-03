class Treasure extends MovableObject {
    height = 60;
    width = 60;

    offSetX = 0;
    offSetY = 0;
    offSetWidth = 0;
    offSetHeight = 0;


    /**
     * 
     * @param {number} x - positioning on the x axis
     * @param {number} y - positioning on the y axis
     */
    constructor(x, y) {
        super().loadImage('treasures/3.png');
        this.x = x;
        this.y = y;
    }
}