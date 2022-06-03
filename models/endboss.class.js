class Endboss extends MovableObject {
    height = 800;
    width = 800;
    y = -220;
    x = 1420;
    imges;
    speed = 0.7;
    // walking_sound = new Audio('audio/chicken.mp3');

    xBox = this.x + 270;
    yBox = this.y + 270;
    widthBox = this.width - 550;
    heightBox = this.height - 370;


    constructor() {
        super().loadImage('troll/1/Troll_01_1_WALK_000.png');
        if (this.enemyIndex == 1) {
            this.imges = new Troll_Image1;
        } else if (this.enemyIndex == 2) {
            this.imges = new Troll_Image2;
        } else if (this.enemyIndex == 3) {
            this.imges = new Troll_Image3;
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