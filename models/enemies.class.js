class Enemies extends MovableObject {
    // height = 300;
    height = Math.floor(Math.random() * (370 - 300 + 1) + 300);
    // width = 300;
    width = Math.floor(Math.random() * (370 - 300 + 1) + 300);
    // x = 720 + Math.random() * 160;
    x = Math.floor(Math.random() * (850 - 720 + 1) + 720);
    // y = 180 + Math.random() * 30;
    y = Math.floor(Math.random() * (160 - 140 + 1) + 140);

    imges;

    xBox = this.x + 120;
    yBox = this.y + 130;
    heightBox = this.height - 170;
    widthBox = this.width - 240;

    speed = 0.3 + Math.random() * 0.5;
    // walking_sound = new Audio('audio/chicken.mp3');



    constructor() {
        super().loadImage('ork/1/ORK_01_WALK_000.png');

        if (this.enemyIndex == 1) {
            this.imges = new Ork_Image1;
        } else if (this.enemyIndex == 2) {
            this.imges = new Ork_Image2;
        } else if (this.enemyIndex == 3) {
            this.imges = new Ork_Image3;
        }

        this.otherDierection = true;

        this.loadImagesArray(this.imges.Image_Walking);

        setInterval(() => {
            this.walkleft(this.speed);
        }, 1000 / 60);
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