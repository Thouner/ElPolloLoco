class Ork extends MovableObject {
    height = 300;
    width = 300;
    x = 720 + Math.random() * 160;
    y = 180 + Math.random() * 30;

    imges = new Ork_Image3;

    speed = 0.3 + Math.random() * 0.5;
    // walking_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('ork/1/ORK_01_WALK_000.png');

        this.otherDierection = true;

        this.loadImagesArray(this.imges.Image_Walking);

        setInterval(() => {
            this.walkleft(this.speed);
        }, 1000 / 60);
        // this.moveLeft(this.speed);
        this.animationEnemie();



        // this.walking_sound.volume = 0.2;
        // this.walking_sound.loop = true;
        // this.walking_sound.play();
    }

    animationEnemie() {
        setInterval(() => {
            this.animationRepeat(this.imges.Image_Walking);
        }, 200);
    }
}