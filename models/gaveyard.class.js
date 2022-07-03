class Graveyard extends MovableObject {
    height = 200;
    width = 200;


    /**
     * draw the graveyard
     * 
     * @param {number} x - positioning on the x axis
     * @param {nubmer} y - positioning on the y axis
     */
    constructor(x, y) {
        super();
        this.loadImage('imageForIntro/graveyard-finish.png');
        this.x = (x + 50);
        this.y = (y + 75);
    }
}