class leftoverMeat extends MovableObject {
    height = 100;
    width = 100;

    offSetX = 100;
    offSetY = 100;
    offSetWidth = 200;
    offSetHeight = 200;

    constructor(x, y, number) {
        super().loadImage(`Meat/meat (${number}).png`);
        this.x = x;
        this.y = y;
    }
}