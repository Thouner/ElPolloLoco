class Thunder extends MovableObject {
    x = 90;
    y = 0;
    width = 140;
    height = 440;


    IMAGES_Thunder = [
        'thunder/Explosion_1.png',
        'thunder/Explosion_2.png',
        'thunder/Explosion_3.png',
        'thunder/Explosion_4.png',
        'thunder/Explosion_5.png',
    ];


    percentage = 100;


    constructor() {
        super();
        this.loadImage('thunder/Explosion_5.png');
        this.loadImagesArray(this.IMAGES_Thunder);
        this.animationThunder();
    }


    animationThunder() {
        setInterval(() => {

            this.animationRepeat(this.IMAGES_Thunder);
        }, 200);

    }
}