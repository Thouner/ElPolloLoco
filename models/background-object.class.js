class BackgroundObject extends MovableObject {
    // y = 0;
    height = 480;
    width = 720;
    constructor(imagePath, x, y) {
        super().loadImages(imagePath);
        this.x = x;
        this.y = y;

    }
}