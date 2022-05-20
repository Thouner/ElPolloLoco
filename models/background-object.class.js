class BackgroundObject extends MovableObject {
    // y = 0;
    height = 480;
    width = 1440;
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;

    }
}