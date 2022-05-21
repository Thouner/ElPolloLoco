class BackgroundObject extends MovableObject {
    // y = 0;
    height = 480;
    width = 721;

    /**
     * draw all background images
     * 
     * @param {string} imagePath - the path to the image
     * @param {number} x - positioning on the x axis
     * @param {number} y - positioning on the y axis
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;

    }
}