class leftoverMeat extends MovableObject {
    height = 100;
    width = 100;

    offSetX = 100;
    offSetY = 100;
    offSetWidth = 200;
    offSetHeight = 200;


    /**
     * 
     * @param {number} x - positioning on the x axis
     * @param {number} y - positioning on the y axis 
     * @param {number} number - number of the current image path
     */
    constructor(x, y, number) {
        super().loadImage(`Meat/meat (${number}).png`);
        this.x = x;
        this.y = y;
    }
}