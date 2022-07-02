class BackgroundObject extends MovableObject {
    y = 0;
    height = 495;
    width = 880;


    /**
     * draw all background images
     * 
     * @param {string} imagePath - the path to the image
     * @param {number} x - positioning on the x axis
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}