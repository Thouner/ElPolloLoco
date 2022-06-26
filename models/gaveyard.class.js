class Graveyard extends MovableObject {
    height = 200;
    width = 200;

    // offSetX = 100;
    // offSetY = 100;
    // offSetWidth = 200;
    // offSetHeight = 200;

    // images_GRAVE = [
    //     'imageForIntro/graveyard-finish.png',
    //     'imageForIntro/graveyard-finish.png',
    //     'imageForIntro/graveyard-finish.png',
    //     'imageForIntro/graveyard-finish.png',
    // ];

    constructor(x, y) {
        super();
        this.loadImage('imageForIntro/graveyard-finish.png');
        this.x = (x + 50);
        // this.y = (y - 200);
        this.y = (y + 75);
        this.y += 3;
        this.speedY = 32;

        this.applyGravity(290)
    }


}