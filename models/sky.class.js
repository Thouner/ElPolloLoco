class Sky extends MovableObject {
    height = 495;
    width = 880;
    y = 0;


    /**
     * draw sky background image
     * 
     * @param {string} imagePath - the path to the image
     * @param {number} x - positioning on the x axis
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}